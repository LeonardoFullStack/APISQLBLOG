const express=require('express')
const {check} = require('express-validator')
const {validarInputs} =  require('../middleware/validarInputs')

const router=express.Router()

const {getAuthor,
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
} = require('../controllers/apiAuthControllers')

router.get('/profile/:name', getPublicProfile)
router.post('/',getAuthor);
router.post('/verifytoken', jwtVerify)
router.post('/myfollows/', showFollowersByToken);
router.post('/myprofile/', getProfileByToken)
router.post('/follows/new/', newFollower)
router.delete('/follows/del/', deleteFollow)
router.post('/create', createAuthor2)
router.delete('/:email',deleteAuthor);
router.put('/editprofile',[
    check('description','Tienes que poner una descripción').not().isEmpty(),
    check('website', 'Falta el campo website').not().isEmpty(),
    validarInputs
],updateAuthor);



module.exports=router