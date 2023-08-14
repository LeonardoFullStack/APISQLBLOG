const {
    getRepliesByIdModel, 
    createReplyByIdModel,
    addReplyIntegerModel,
    deleteReplyByIdModel
} = require('../models/replies')
const {getOneConnect} = require('../models/entries')


const getRepliesById = async (req, res) => {
    const {id_entry} = req.body

    try {
        const consulta = await getRepliesByIdModel(id_entry)
        
        res.status(200).json({
            ok:true,
            consulta
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
    }
}

const createReplyById = async (req,res) => {
    const {id_entry,name,image,content} = req.body
    const has_image = false;
    try {
        //primero validamos si la entrada existe has_image,image,content,
        const entryExists = await getOneConnect(id_entry)

        if (entryExists.length != 0) {
            const createReply = await createReplyByIdModel(id_entry,name,has_image,image,content)
            const addReplyToEntryInteger =  await addReplyIntegerModel(id_entry)
            res.status(200).json({
                ok:true,
                createReply
            })
        } else {
            res.status(400).json({
                ok:false,
                error:'La entrada no existe'
            })
        }
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
    }



}

const deleteReplyById = async (req,res) => {
    const { id } = req.params

    try {

        if (id) {
            const req = await deleteReplyByIdModel(id)
        res.status(200).json({
            ok:true,
            msg:'Respuesta eliminada'
        })
        } else {
            res.status(400).json({
                ok:true,
                msg:'No se ha recibido el id'
            })
        }
        
    } catch (error) {
        res.status(400).json({
            ok:true,
            msg:'Contacta con el administrador'
        })
    }
}

module.exports = {
    getRepliesById,
    createReplyById,
    deleteReplyById
}