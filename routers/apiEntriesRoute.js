const express=require('express')
const {check} = require('express-validator')
const {validarInputs} =  require('../middleware/validarInputs')
const router=express.Router()


const {
    createEntries,
    deleteEntries,
    getEntries,
    updateEntries, 
    getOneEntry, 
    deleteById, 
    updateById,
    getMyEntries,
    createEntriesV2,
    entriesProof,
    getCategories,
    getSearch,
    getEntriesByName,
    showTrends,
    getAllMyFeed
} = require('../controllers/apiEntriesController')

router.post('/pruebichi', entriesProof)

router.get('/categorias/', getCategories)

router.get('/',getEntries);
router.get('/trends', showTrends)
router.post('/', getMyEntries);
router.post('/myfeed', getAllMyFeed)
router.post('/allmyentries', getEntriesByName)
router.get('/search/:search', getSearch)
router.post('/create',[
    check('title','Tienes que poner un nombre').not().isEmpty(),
    check('name', 'No se encuentra el campo nombre').not().isEmpty(),
    check('content', 'Tienes que poner un contenido').not().isEmpty(),
    check('category', 'Tienes que poner una categoría').not().isEmpty(),
    check('extract', 'Tienes que poner una categoría').not().isEmpty(),
    validarInputs
],createEntriesV2);
router.delete('/:title',[check('email', 'No se encuentra el campo email').not().isEmpty(),
validarInputs
],deleteEntries);
router.delete('/delbyid/:id', deleteById)
router.put('/:title',[
    check('title','Tienes que poner un nombre').not().isEmpty(),
    check('name', 'No se encuentra el campo nombre').not().isEmpty(),
    check('content', 'Tienes que poner un contenido').not().isEmpty(),
    check('category', 'Tienes que poner una categoría').not().isEmpty(),
    validarInputs
],updateEntries);
router.put('/editId/:id', updateById)
router.get('/one/:id', getOneEntry)











module.exports=router
