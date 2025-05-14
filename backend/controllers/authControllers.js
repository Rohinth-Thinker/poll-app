const { checkExistEmail, addUser } = require("../database/dbFunctions");
const setCookie = require("../utils/setCookie");
const { generateToken } = require("../utils/tokenFunction");
const validateInputs = require("../utils/validateInputs");

async function signup(req, res) {
    try { 
        const inputs = req.body;

        const validate = validateInputs(inputs);
        if(!validate.status) {
            return res.status(400).json(validate.error);
        }

        const isExistEmail = await checkExistEmail(inputs.email);
        if(isExistEmail) {
            return res.status(400).json({occuredAt: 'email', msg: 'This email aldready exists'});
        }

        const user = await addUser(inputs);
        const token = generateToken(user.id);
        setCookie(res, token);

        res.status(200).json({userId: user.id});

    } catch(err) {
        console.log('At signup controller ', err.name, err.message);
        res.status(400).json({error : "An error occured, Try again later..."});
    }
}

async function login(req, res) {
    try {
        const inputs = req.body;

        const validate = validateInputs(inputs);
        if(!validate.status) {
            return res.status(400).json(validate.error);
        }

        const user = await checkExistEmail(inputs.email);
        if(!user) {
            return res.status(400).json({occuredAt: 'email', msg: 'Invalid email'});
        }

        if(user.password !== inputs.password) {
            return res.status(400).json({occuredAt: 'password', msg: 'Incorrect password'});
        }

        const token = generateToken(user.id);
        setCookie(res, token);

        res.status(200).json({userId: user.id});
    } catch(err) {
        console.log('At login controller, ', err.name, err.msg);
        res.status(200).json({error: 'An error occured, Try again later...'});
    }
}

module.exports = { signup, login };