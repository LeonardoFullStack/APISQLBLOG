const { Pool } = require('pg')
const queries = require('./queries')

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

//ACCEDER A LOS AUTORES POR EMAIL
const getAuthByEmail = async (email) => {

    let respuesta;

    try {
        client = await pool.connect()

        const data = await client.query(queries.getAut, [email])
        if (data.rows.length == 0) {
            respuesta = {
                ok:false,
                msg:'no se ha encontrado el usuario'
            }
        } else {
            respuesta = {
                ok:true,
                msg: `Usuario con email ${email}`,
                data: data.rows 
            } 
        }
        

    } catch (error) {
      
        throw error
    } finally {
        client.release()
    }
    console.log(respuesta)
    return respuesta

}

const getEmailByName = async (name) => {
    let client,data;
    try {
        client = await pool.connect()
        data = await client.query(queries.getAutByName, [name])
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
    }

    return data.rows[0].email
}

const getAuthByName = async (name) => {
    let client,data;
    try {
        client = await pool.connect()
        data = await client.query(queries.getAutByName, [name])
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
    }

    if (data.rows.length == 0) {
        return {
            ok:false
        }
    } else {
        return {
            ok:true,
            data:data.rows
        }
    }
}

//TRAER TODOS LOS AUTORES
const getAllAuthsConnect =async () => {
    let client, result;
    try {

        client = await pool.connect()
        const data = await client.query(queries.getAllAuts)
        result=data.rows


    } catch (error) {
        
        throw error
    } finally {
        client.release()
    }

   return result
}

//CREAR AUTOR
const createAutConnect =async (name, surname, email, password, avatar) => {
    let respuesta;

    try {
        client = await pool.connect()
        console.log('llegooooo')
        const data = await client.query(queries.createAut, [name,surname,email, password, avatar])
        respuesta = data.rows
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
   
    return respuesta
}
//ELIMINAR AUTOR
const deleteAutConnect =async (email) => {

    let data,client
    try {
        client = await pool.connect()
     
         data = await client.query(queries.deleteAut, [email])
        
         
    } catch (error) {
        
        throw error
    } finally {

        client.release()
    }
   
    /* return data.rows */
}
//ACTUALIZAR AUTOR
const updateAutConnect =async (emailViejo, name, surname, email,image,  password) => {
    let data,client
    try {
         client = await pool.connect()
         data = await client.query(queries.updateAut, [emailViejo, name, surname, email, image,password])
        
    } catch (error) {
    
       throw error 
    } finally {
        client.release()
    }
    return data.rows
}

//NUEVO FOLLOWER
const newFollowerConnect = async (follower, following) => {
    let data,client
    try {
         client = await pool.connect()
         data = await client.query(queries.createFollower, [follower,following])
        
    } catch (error) {
    
       throw error 
    } finally {
        client.release()
    }
    return data.rows
}

const deleteFollowerConnect = async (follower, following) => {
    let data,client
    try {
         client = await pool.connect()
         data = await client.query(queries.deleteFollower, [follower,following])
        
    } catch (error) {
    
       throw error 
    } finally {
        client.release()
    }
    return data.rows
}

const showFollowersConnect = async (follower) => {
    let data,client
    try {
         client = await pool.connect()
         data = await client.query(queries.showFollowers, [follower])
        
    } catch (error) {
    
       throw error 
    } finally {
        client.release()
    }
    return data.rows
}

const getMyProfileConnect = async (name) => {
    let data,client
    try {
         client = await pool.connect()
         data = await client.query(queries.getMyProfile, [name])
        
    } catch (error) {
    
       throw error 
    } finally {
        client.release()
    }
    return data.rows
}

const getAllFollowsConnect = async (name) => {
    let data,client
    try {
         client = await pool.connect()
         data = await client.query(queries.getAllFollows, [name])
        
    } catch (error) {
    
       throw error 
    } finally {
        client.release()
    }
    return data.rows
}

const showPublicProfileConnect = async (name) => {
    let data,client
    try {
         client = await pool.connect()
         data = await client.query(queries.showPublicProfile, [name])
        
    } catch (error) {
    
       throw error 
    } finally {
        client.release()
    }
    return data.rows
}

module.exports = {
    getAuthByEmail,
    createAutConnect,
    deleteAutConnect,
    updateAutConnect,
    getAllAuthsConnect,
    getEmailByName,
    getAuthByName,
    newFollowerConnect,
    deleteFollowerConnect,
    showFollowersConnect,
    getMyProfileConnect,
    getAllFollowsConnect,
    showPublicProfileConnect
}