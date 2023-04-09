const { Pool } = require('pg')
const queries = require('./queries')

const pool = new Pool({
    host: 'kandula.db.elephantsql.com',
    user: 'xrkzcuuj',
    database: 'xrkzcuuj',
    password: 'Cu7FxPLSMPrpy6YmtbV620-TT-hPqxCh',
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

    return respuesta

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
const createAutConnect =async (name, surname, email, image, password) => {
    let respuesta;

    try {
        client = await pool.connect()

        const data = await client.query(queries.createAut, [name,surname,email,image, password])
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

module.exports = {
    getAuthByEmail,
    createAutConnect,
    deleteAutConnect,
    updateAutConnect,
    getAllAuthsConnect
}