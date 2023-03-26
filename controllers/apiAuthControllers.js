const { getAuthByEmail, createAutConnect, deleteAutConnect, updateAutConnect, getAllAuthsConnect } = require('../models/author');
const { getAllAuts } = require('../models/queries');

const getAuthor = async (req, res) => {
    let data, msg
    let email = req.query.email
    console.log(req.query.email)
    try {
        if (email) {
            let email = req.query.email
            console.log(email, 'el mail')
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
    const { name, surname, email, image } = req.body
    const emailLibre = await getAuthByEmail(email)
    console.log(emailLibre)
    if (!emailLibre.ok) {
        try {
            const data = await createAutConnect(name, surname, email, image)
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

    try {

        const data = await deleteAutConnect(req.params.email)

        res.status(200).json({
            ok: true,
            msg: `El usuario con email ${req.params.email} ha sido borrado`
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al borrar el usuario'
        })
    }
}

const updateAuthor = async (req, res) => {
    const { name, surname, email, image } = req.body
    const emailViejo = req.params.email
    try {
        const data = await updateAutConnect(emailViejo, name, surname, email, image)
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