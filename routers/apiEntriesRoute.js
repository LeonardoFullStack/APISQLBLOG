const express=require('express')
const {check} = require('express-validator')
const {validarInputs} =  require('../middleware/validarInputs')
const router=express.Router()

const {createEntries,deleteEntries,getEntries,updateEntries} = require('../controllers/apiEntriesController')


router.get('/',getEntries);
router.post('/',[
    check('title','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty(),
    check('content', 'Tienes que poner un contenido').not().isEmpty(),
    check('category', 'Tienes que poner una categoría').not().isEmpty(),
    validarInputs
],createEntries);
router.delete('/:title',deleteEntries);
router.put('/:title',[
    check('title','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty(),
    check('content', 'Tienes que poner un contenido').not().isEmpty(),
    check('category', 'Tienes que poner una categoría').not().isEmpty(),
    validarInputs
],updateEntries);










module.exports=router
