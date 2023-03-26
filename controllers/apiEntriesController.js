const { getEntriesByEmail, createEntriesByEmail, deleteEntriesByEmail, updateEntriesById, getAllEntriesConnect } = require('../models/entries')

const { getAuthByEmail } = require('../models/author');

const getEntries = async (req, res) => {
    let data, msg, ok
    let email = req.query.email
    let userExists = await getAuthByEmail(email)
    if (userExists.ok) {
        try {

            if (email) {
                data = await getEntriesByEmail(email)
                if (data.length == 0) {
                    ok = true;
                    msg = 'El usuario no tiene entradas'
                } else {
                    msg = `entradas del usuario ${email}`
                }

            } else {

                data = await getAllEntries()
                ok = true
                msg = 'Todas las entradas'
            }
            res.status(200).json({
                ok: true,
                msg,
                data
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'contacta con el administrador'
            })
        }
    } else {
        res.status(404).json(({
            ok: false,
            msg: 'No se ha encontrado el usuario'
        }))
    }

}

const getAllEntries = async () => {
    let data;
    try {
        data = await getAllEntriesConnect()
        console.log(data)

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador'
        })
    }
    return data
}

const createEntries = async (req, res) => {
    const { title, content, email, category } = req.body
    let userExists = await getAuthByEmail(email)
    if (userExists.ok) {

        try {
            const data = await createEntriesByEmail(title, content, email, category);
            console.log(data, 'data')
            res.status(200).json({
                ok: true,
                msg: 'entrada creada',
                data: {
                    title,
                    content,
                    email,
                    category
                }
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'error al crear la entrada'
            })
        }
    } else {
        res.status(404).json({
            ok: false,
            msg: 'El usuario con ese email no existe'
        })
    }


}



const deleteEntries = async (req, res) => {
    const { email } = req.body
    const { title } = req.params
    let userExists = await getAuthByEmail(email)
    let titleExists = await getEntriesByEmail(email)
    let sameEntry = titleExists.filter(object => object.title.includes(title))

    if (userExists.ok && sameEntry.length != 0) {
        try {
            const data = await deleteEntriesByEmail(title, email)

            res.status(200).json({
                ok: true,
                msg: 'entrada borrada',
                data: {
                    title,
                    email
                }
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'error al borrar la entrada'
            })
        }
    } else {
        res.status(404).json({
            ok: false,
            msg: 'El email del usuario o la entrada no existe en nuestra base de datos'
        })
    }


}


const updateEntries = async (req, res) => {
    const { email, title, content, category } = req.body
    const oldTitle = req.params.title

    let userExists = await getAuthByEmail(email)
    let titleExists = await getEntriesByEmail(email)
    let sameEntry = titleExists.filter(object => object.title.includes(oldTitle))
    console.log(userExists.ok, sameEntry)
    if (userExists.ok && sameEntry.length != 0) {
        try {
            const data = await updateEntriesById(email, oldTitle, title, content, category)
            console.log(data)
            res.status(200).json({
                ok: true,
                msg: 'entrada actualizada',
                data: {
                    title,
                    content,
                    category
                }
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'error al actualizar'
            })
        }
    } else {
        res.status(404).json({
            ok: false,
            msg: 'No se ha encontrado el usuario o la entrada'
        })
    }
}

module.exports = {
    getEntries,
    createEntries,
    deleteEntries,
    updateEntries
}

