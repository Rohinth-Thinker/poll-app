const userList = require("../models/userListModel");

async function checkExistEmail(email) {
    try {
        const response = await userList.findOne({email});
        return response;
    } catch(err) {
        throw err;
    }
}

async function addUser(inputs) {
    try {
        const response = await userList.create(inputs);
        return response;
    } catch(err) {
        throw err;
    }
}

async function findUserById(userId) {
    try {
        const response = await userList.findById(userId).select("-password");
        return response;
    } catch(err) {
        throw err;
    }
}

async function fetchSlidesByUserId(userId) {
    try {
        const response = await userList.findById(userId).select("slideList").populate("slideList");
        return response;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    checkExistEmail, addUser, findUserById,
    fetchSlidesByUserId,
}