const jwt = require('jsonwebtoken');

const decodedToken = async (token) => {
    let decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    let {isAdmin, name} = await decoded

    return {
        name,
        isAdmin
    }
}

module.exports = {
    decodedToken
}