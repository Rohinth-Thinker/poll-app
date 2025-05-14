const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { findUserById } = require('../database/dbFunctions');

function generateToken(userId) {
    const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn: '15d'});
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
}

async function validateToken(req, res, next) {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(400).json({error: "Token is not provided"});
        }

        const decoded = verifyToken(token);
        if(!decoded) {
            return res.status(400).json({error: "Invalid token"});
        }

        const user = await findUserById(decoded.userId);
        if(!user) {
            return res.status(400).json({error: "Invalid token"});
        }

        req.userId = user._id;
        next();
    } catch(err) {
        console.log("At validateToken util function", err.name, err.message);
        res.status(400).json({error: "An error occured, Try again laetr..."});
    }
}

module.exports = { generateToken, validateToken };