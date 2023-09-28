const { Pool } = require('pg')

const queries=require('./queries')

const pool = new Pool({
    host: process.env.HOST_PG,
    user: process.env.USER_PG,
    database: process.env.USER_PG,
    password: process.env.PASS_PG,
    port: 5432, // Puerto por defecto para PostgreSQL
    ssl: {
      rejectUnauthorized: false // Habilitar SSL sin verificar el certificado
    }
  });

//ACCEDER A LAS ENTRADAS POR EMAIL
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getEntriesByEmail,[email])

        result=data.rows
       


    } catch (error) {
        
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
       
        throw error
    } finally {
        client.release()
    }
   
    return data
}

const getAllEntriesConnect =async (pag) => {
    let client, result;
    try {

        client = await pool.connect()
        const data = await client.query(queries.getAllEntries)
        result=data.rows
       
        

    } catch (error) {
     
        throw error
    } finally {
        client.release()
    }

   return result

}

//ACCEDER A LAS ENTRADAS POR PÁGINA
const getAllEntriesByPageConnect =async (pag) => {
    let client, result;
    try {

        client = await pool.connect()
        const data = await client.query(queries.getAllEntriesByPage, [pag])
        result=data.rows
       
        

    } catch (error) {
     
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
       
        throw error
    } finally {
        client.release()
    }
    return data.rows
}

const updateByIdConnect =async (title, content, category, entryImage, extract, id) => {
    let client,data
    try {
         client = await pool.connect()
         data = await client.query(queries.updateEntryById, [id, title, content, category, entryImage, extract])
    } catch (error) {
       
        throw error
    } finally {
        client.release()
    }
    return data.rows
}

const showCategories = async () => {
    let client,data
    try {
         client = await pool.connect()
         data = await client.query(queries.showCategories)
    } catch (error) {
       
        throw error
    } finally {
        client.release()
    }
    return data.rows
}

const showEntriesByCategoryConnect = async (category) => {
    let client,data
    try {
         client = await pool.connect()
         data = await client.query(queries.showEntriesByCategory, [category])
    } catch (error) {
       
        throw error
    } finally {
        client.release()
    }
    return data.rows
}

const getLastEntriesFromAuthConnect = async (name, offSet) => {
    let client,data
    try {
         client = await pool.connect()
         data = await client.query(queries.getLastEntriesFromAuth, [name, offSet])
    } catch (error) {
       
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
    getAllEntriesByPageConnect,
    getOneConnect,
    deleteByIdConnect,
    updateByIdConnect,
    getAllEntriesConnect,
    showCategories,
    showEntriesByCategoryConnect,
    getLastEntriesFromAuthConnect
    
}

