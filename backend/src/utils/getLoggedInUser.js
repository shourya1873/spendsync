const jwt = require('jsonwebtoken');

const getUserId = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.userId;
}

module.exports = getUserId