const { Pool } = require('pg')

const queries= require('./queries')

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

const getRepliesByIdModel = async (id_entry) => {
    let client,result;
    try {

        client = await pool.connect();
        const data = await client.query(queries.getAllRepliesFromAEntry, [id_entry])
        result = data.rows

    } catch (error) {
        throw error
    } finally {
        client.release()
    }
    return result
}

const createReplyByIdModel = async (id_entry,name,has_image,image,content) => {
    let client,result;
    console.log(id_entry,name,has_image,image,content)
    try {

        client = await pool.connect();
        const data = await client.query(queries.createReplyFromEntryId, [id_entry,name,has_image,image,content])
        result = data.rows

    } catch (error) {
        throw error
    } finally {
        client.release()
    }
    return result
}

const addReplyIntegerModel = async (id) => {
    let client,result;
    console.log(id)
    try {

        client = await pool.connect();
        const data = await client.query(queries.addReplyInteger, [id])
        result = data.rows

    } catch (error) {
        throw error
    } finally {
        client.release()
    }
    return result
}

const deleteReplyByIdModel = async (id) => {
    let client,result;
    console.log(id)
    try {

        client = await pool.connect();
        const data = await client.query(queries.deleteReplyByIdQuery, [id])
        result = data.rows

    } catch (error) {
        throw error
    } finally {
        client.release()
    }
    return result
}

module.exports = {
    getRepliesByIdModel,
    createReplyByIdModel,
    addReplyIntegerModel,
    deleteReplyByIdModel
}