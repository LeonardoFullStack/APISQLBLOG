const express=require('express')
const {check} = require('express-validator')
const {validarInputs} =  require('../middleware/validarInputs')
const router=express.Router()

const {createEntries,deleteEntries,getEntries,updateEntries, getOneEntry, deleteById, updateById} = require('../controllers/apiEntriesController')


router.get('/',getEntries);
router.post('/',[
    check('title','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'No se encuentra el campo email').not().isEmpty(),
    check('content', 'Tienes que poner un contenido').not().isEmpty(),
    check('category', 'Tienes que poner una categoría').not().isEmpty(),
    validarInputs
],createEntries);
router.delete('/:title',[check('email', 'No se encuentra el campo email').not().isEmpty(),
validarInputs
],deleteEntries);
router.delete('/delbyid/:id', deleteById)
router.put('/:title',[
    check('title','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'No se encuentra el campo email').not().isEmpty(),
    check('content', 'Tienes que poner un contenido').not().isEmpty(),
    check('category', 'Tienes que poner una categoría').not().isEmpty(),
    validarInputs
],updateEntries);
router.put('/editId/:id', updateById)
router.get('/one/:id', getOneEntry)











module.exports=router
