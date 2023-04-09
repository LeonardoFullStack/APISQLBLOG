const { getAuthByEmail, createAutConnect, deleteAutConnect, updateAutConnect, getAllAuthsConnect } = require('../models/author');
const { getAllAuts, } = require('../models/queries');

const getAuthor = async (req, res) => {
    let data, msg
    let email = req.query.email
    
    try {
        if (email) {

            
            const consulta = await getAuthByEmail(email)
            if (consulta.ok) {
                msg = 'Se ha encontrado el usuario'
                res.status(200).json({
                    ok: true,
                    msg,
                    data: consulta.data
                })
            } else if (!consulta.ok) {
                msg = 'No se ha encontrado ningún usuario con ese email'
                res.status(404).json({
                    ok: false,
                    msg
                })
            }

        } else {
            data = await getAllAuths()
            msg = 'Todos los usuarios'
            res.status(200).json({
                ok: true,
                msg,
                data
            })
        }



    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador'
        })
    }
}

const getAllAuths = async (req, res) => {
    let data;
    try {
        data = await getAllAuthsConnect()


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador'
        })
    }
    return data
}

const createAuthor = async (req, res) => {
    const { name, surname, email, image, password } = req.body
    const emailLibre = await getAuthByEmail(email)
    
    if (!emailLibre.ok) {
        try {
            const data = await createAutConnect(name, surname, email, image, password)
            res.status(200).json({
                ok: true,
                msg: `el usuario ${name} ha sido creado`,
                data: {
                    name,
                    surname,
                    email,
                    image
                }
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'error al crear el usuario'
            })
        }
    } else {
        res.status(500).json({
            ok: false,
            msg: 'El email ya está en uso'
        })
    }
}

const deleteAuthor = async (req, res) => {

    let email = req.params.email
  


    try {

        const userExists = await getAuthByEmail(email)
        if (userExists.ok) {

            const data = await deleteAutConnect(email)

            res.status(200).json({
                ok: true,
                msg: `El usuario con email ${email} ha sido borrado`
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: 'No se ha encontrado el autor'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al borrar el usuario'
        })
    }

}

const updateAuthor = async (req, res) => {
    const { name, surname, email, image, password } = req.body
    const emailViejo = req.params.email
    try {
        let userExists = await getAuthByEmail(emailViejo)
        if (userExists.ok) {
            const data = await updateAutConnect(emailViejo, name, surname, email, image, password)
            res.status(200).json({
                ok: true,
                msg: 'Usuario actualizado',
                data: {
                    name,
                    surname,
                    email,
                    image
                }
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: 'No se ha encontrado el autor'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar el usuario'
        })
    }
}

module.exports = {
    getAuthor,
    createAuthor,
    deleteAuthor,
    updateAuthor
}