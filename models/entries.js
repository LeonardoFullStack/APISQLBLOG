const { Pool } = require('pg')

const queries=require('./queries')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'blog',
    password: 'admin'
})

//ACCEDER A LAS ENTRADAS POR EMAIL
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getEntriesByEmail,[email])

        result=data.rows
        console.log(result)


    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }

   return result

}
//CREAR UNA ENTRADA
const createEntriesByEmail =async (title,content,email,category) => {
    let data,client
    try {
     client = await pool.connect()
    data = await client.query(queries.createEntries,[title,content,email,category])
    
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    
    return data
}

//ACCEDER A TODAS LAS ENTRADAS
const getAllEntriesConnect =async () => {
    let client, result;
    try {

        client = await pool.connect()
        const data = await client.query(queries.getAllEntries)
        result=data.rows


    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }

   return result

}

const deleteEntriesByEmail =async (title, email) => {
let client,data
    try {
         client = await pool.connect()
         data = await client.query(queries.deleteEntry, [title, email])
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }

}

const updateEntriesById =async (email, title, newTitle, content, category) => {
    let client,data
    try {
         client = await pool.connect()
         data = await client.query(queries.updateEntry, [email, title, newTitle, content, category])
        
    } catch (error) {
       console.log(error)
       throw error 
    } finally {
        client.release()
    }
    return data
}


//ELIMINAR UNA ENTRADA
//ACUALIZAR UNA ENTRADA

module.exports={
    getEntriesByEmail,
    createEntriesByEmail,
    deleteEntriesByEmail,
    updateEntriesById,
    getAllEntriesConnect
    
}

