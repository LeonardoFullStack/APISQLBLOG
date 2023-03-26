const express=require('express')
const {check} = require('express-validator')
const {validarInputs} =  require('../middleware/validarInputs')

const router=express.Router()

const {getAuthor,createAuthor,deleteAuthor,updateAuthor} = require('../controllers/apiAuthControllers')

router.get('/',getAuthor);
router.post('/',[
    check('name','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty().isEmail(),
    check('surname', 'Tienes que poner un sobrenombre (surname)').not().isEmpty(),
    validarInputs
],createAuthor);
router.delete('/:email',deleteAuthor);
router.put('/:email',[
    check('name','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty(),
    check('surname', 'Tienes que poner un sobrenombre (surname)').not().isEmpty(),
    validarInputs
],updateAuthor);


module.exports=router