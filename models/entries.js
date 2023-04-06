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

const getOneConnect = async (entry) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getOneEntry,[entry])
        result = data.rows
        console.log(result)
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
    return result
}
//CREAR UNA ENTRADA
const createEntriesByEmail =async (title,content,email,category,entryImage,extract) => {
    let data,client
    try {
     client = await pool.connect()
    data = await client.query(queries.createEntries,[title,content,email,category,entryImage,extract])
    
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    console.log(data)
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

const updateEntriesById =async (email, oldTitle, title, content, category, entryImage, extract) => {
    let client,data
    try {
         client = await pool.connect()
         data = await client.query(queries.updateEntry, [email, oldTitle, title, content, category, entryImage, extract])
        
    } catch (error) {
       console.log(error)
       throw error 
    } finally {
        client.release()
    }
    return data
}


const deleteByIdConnect =async (id) => {
    let client,data
    try {
         client = await pool.connect()
         data = await client.query(queries.deleteEntryById, [id])
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return data.rows
}

module.exports={
    getEntriesByEmail,
    createEntriesByEmail,
    deleteEntriesByEmail,
    updateEntriesById,
    getAllEntriesConnect,
    getOneConnect,
    deleteByIdConnect
    
}

