const express= require('express')
const {check} = require('express-validator')
const {validarInputs} =  require('../middleware/validarInputs')
const router = express.Router()

const {getRepliesById, 
    createReplyById,
    deleteReplyById
} = require('../controllers/apiRepliesControllers')

router.post('/', [
    check('id_entry','id de la entrada no recibido').not().isEmpty(),
    validarInputs
],getRepliesById); // coge todas las respuestas de un id_entry

router.post('/createreply',[
    check('id_entry','id de la entrada no recibido').not().isEmpty(),
    check('content', 'Falta el contenido').not().isEmpty(),
    validarInputs
], createReplyById); //crea una respuesta a una id_entry

router.delete('/delete/:id', deleteReplyById)

module.exports = router