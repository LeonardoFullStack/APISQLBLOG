const express=require('express')
const {check} = require('express-validator')
const {validarInputs} =  require('../middleware/validarInputs')

const router=express.Router()

const {getAuthor,createAuthor,deleteAuthor,updateAuthor,createAuthor2, jwtVerify} = require('../controllers/apiAuthControllers')

router.post('/',getAuthor);
router.post('/verifytoken', jwtVerify)
router.post('/create', createAuthor2)
router.delete('/:email',deleteAuthor);
router.put('/:email',[
    check('name','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty(),
    check('surname', 'Tienes que poner un sobrenombre (surname)').not().isEmpty(),
    validarInputs
],updateAuthor);



module.exports=router