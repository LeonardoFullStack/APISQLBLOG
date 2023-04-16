const express=require('express')

const app=express()

//usar dotenv
require('dotenv').config();
const port=process.env.PORT || 3000;


// Body-parser middleware
app.use(express.urlencoded({extended:true}))
// usar jsons
app.use(express.json())


app.use(express.static(__dirname+'/public'))


app.use('/api/entries',require('./routers/apiEntriesRoute'))
app.use('/api/aut',require('./routers/apiAutRoute'))


app.listen(port,()=>{
    
    console.log(`servidor a la escucha del ${port}`)
})
