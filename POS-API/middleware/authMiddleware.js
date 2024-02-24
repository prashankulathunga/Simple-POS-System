const jsonwebtoken = require('jsonwebtoken');

const verifyToken = (req, resp, next) => {
    const autharizedHeader = req.headers.authorization;

    if (!autharizedHeader) {
        return resp.status(403).json({status: false, error: 'no token provided!'});
    }
    if (!autharizedHeader.startsWith('Bearer')) {
        return resp.status(404).json({status: false, error: 'invalid token format!'});
    }

    const token = autharizedHeader.slice(7);
    if (!token) {
        return resp.status(404).json({status: false, error: 'invalid token!'});
    }

    try {

        const decodedData = jsonwebtoken.verify(token, process.env.SECRET_KEY);
        next();

    } catch (e) {
        return resp.status(500).json(e);
    }

}
module.exports = verifyToken;