const { getAuthByEmail,
    createAutConnect,
    deleteAutConnect,
    updateAutConnect,
    getAllAuthsConnect,
    getEmailByName,
    getAuthByName,
    newFollowerConnect,
    deleteFollowerConnect,
    showFollowersConnect,
    getMyProfileConnect,
    getAllFollowsConnect,
    showPublicProfileConnect
} = require('../models/author');

const { getAllAuts, } = require('../models/queries');
const { generarJwt, generarJwtAdmin } = require('../helpers/jwt')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { decodedToken } = require('../helpers/decodeToken');
const { getLastEntriesFromAuthConnect } = require('../models/entries');

const getAuthor = async (req, res) => {
    let data, msg, token, tokenz, passwordOk
    let { email, password } = req.body
    console.log(email, password)

    try {
        const consulta = await getAuthByEmail(email)
        console.log(consulta, 'consul')


        if (consulta.ok) {
            passwordOk = bcrypt.compareSync(password, consulta.data[0].password);

            if (passwordOk) {
                token = await generarJwt(consulta.data[0].id_author, consulta.data[0].name, consulta.data[0].isadmin);
                msg = 'Login correcto'
                res.status(200).json({
                    ok: true,
                    msg,
                    token
                })
            } else {
                msg = 'Login fallido'
                res.status(400).json({
                    ok: false,
                    msg
                })
            }




        } else if (!consulta.ok) {
            msg = 'No se ha encontrado al usuario'
            res.status(404).json({
                ok: false,
                msg
            })
        }





    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
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
    const { name, surname, email, password } = req.body
    const emailLibre = await getAuthByEmail(email)
    let token;

    if (!emailLibre.ok) {
        try {
            const data = await createAutConnect(name, surname, email, password)
            const getId = await getAuthByEmail(email)
            token = await generarJwt(getId.data[0].id_author, name)
            res.status(200).json({
                ok: true,
                msg: `el usuario ${name} ha sido creado`,
                data: {
                    name,
                    surname,
                    email,
                    password,
                },
                token

            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: error
            })
        }
    } else {
        res.status(500).json({
            ok: false,
            msg: 'El email ya está en uso'
        })
    }
}

const createAuthor2 = async (req, res) => {
    const { name, surname, email, password, avatar } = req.body

    let status, ok, msg, token, data;

    try {
        const emailLibre = await getAuthByEmail(email)
        const freeName = await getAuthByName(name)
        console.log(emailLibre, freeName, 'nombres')

        if (emailLibre.ok) {
            status = 400;
            ok = false;
            msg = 'Email en uso'

        } else if (freeName.ok) {
            status = 400;
            ok = false;
            msg = 'Nombre en uso'

        } else {
            console.log('paso por aqui')
            //aqui creamos el autor 
            let salt = bcrypt.genSaltSync(10);
            let newPass = bcrypt.hashSync(password, salt)
            console.log(password, 'pass', newPass)

            const req = await createAutConnect(name, surname, email, newPass, avatar)
            const getId = await getAuthByEmail(email)

            token = await generarJwt(getId.data[0].id_author, name)
            status = 200
            ok = true
            msg = 'Usuario creado'
            data = {
                name,
                surname,
                email,
                avatar,
            }

        }


    } catch (error) {
        console.log('paso por error')
        status = 400;
        ok = false;
        msg = error
    }

    res.status(status).json({
        ok,
        msg,
        data,
        token
    })
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
    const { name, avatar, description, background, website } = req.body

    try {
            const data = await updateAutConnect(name, avatar, description, background, website)
            res.status(200).json({
                ok: true,
                msg: 'Usuario actualizado',
                data: {name, avatar, description, background, website}
            })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar el usuario'
        })
    }
}

const jwtVerify = async (req, res) => {
    const { token } = req.body

    try {
        let decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        let { isAdmin, name } = await decoded
        res.status(200).json({
            ok: true,
            name,
            isAdmin
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token inválido'
        })
    }
}

const newFollower = async (req, res) => {
    const follower = req.body.follower
    const following = req.body.following

    try {
        const newFollower = newFollowerConnect(follower, following)
        res.status(200).json({
            ok: true,
            msg: 'Se ha añadido a seguidos'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }

}

const deleteFollow = async (req, res) => {
    const follower = req.body.follower
    const following = req.body.following

    try {
        const newFollower = deleteFollowerConnect(follower, following)
        res.status(200).json({
            ok: true,
            msg: 'Se ha eliminado de seguidos'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }

}

const showFollowersByToken = async (req, res) => {
    const token = req.body.token
    try {
        const nameOfToken = await decodedToken(token);

        const showFollowers = await showFollowersConnect(nameOfToken.name)
        res.status(200).json({
            ok: true,
            msg: `Todos los seguidores de ${nameOfToken.name}`,
            showFollowers
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

const getProfileByToken = async (req, res) => {
    const { token, page } = req.body
    const offSet = (page - 1) * 4 //las entradas a saltar según la página

    try {
        const nameOfToken = await decodedToken(token);
        const req = await getMyProfileConnect(nameOfToken.name)
        const pageEntries = await getLastEntriesFromAuthConnect(nameOfToken.name, 0)
        const entries = await getLastEntriesFromAuthConnect(nameOfToken.name, offSet)
        const follows = await getAllFollowsConnect(nameOfToken.name)
        const pages = Math.ceil(pageEntries.length / 4)
        const entriesSliced = entries.slice(0, 4)

        res.status(200).json({
            ok: true,
            msg: 'Datos de tu perfil',
            data: req,
            follows: follows[0],
            entries: entriesSliced,
            pages
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

const getPublicProfile = async (req, res) => {
    const publicName = req.params.name
    let offSet = (req.query.pag - 1) * 4

    if (req.query.pag == undefined) offSet = 0


    try {
        const request1 = await showPublicProfileConnect(publicName)

        if (request1.length == 0) {
            res.status(400).json({
                ok: false,
                msg: 'No se ha encontrado al usuario'
            })
        } else {


            const entriesPages = await getLastEntriesFromAuthConnect(publicName, 0)
            const entries = await getLastEntriesFromAuthConnect(publicName, offSet)
            const follows = await getAllFollowsConnect(publicName)
            const pages = Math.ceil(entriesPages.length / 4)
            const entriesSliced = entries.slice(0, 4)

            res.status(200).json({
                ok: true,
                profile: request1,
                entries: entriesSliced,
                follows,
                pages
            })
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }

}


module.exports = {
    getAuthor,
    createAuthor,
    deleteAuthor,
    updateAuthor,
    createAuthor2,
    jwtVerify,
    newFollower,
    deleteFollow,
    showFollowersByToken,
    getProfileByToken,
    getPublicProfile
}