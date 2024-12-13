const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);
    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado. Por favor, autentíquese.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado. Por favor, autentíquese.' });
    }

    try {
        const user = jwt.verify(token, config.jwtSecret);
        res.locals.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token no válido o ha expirado.' });
    }
};

module.exports = { authenticateToken };
