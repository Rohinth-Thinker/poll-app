
const mongoose = require("mongoose");

const userListSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    slideList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slidesArray',
    }]
})

module.exports = mongoose.model('userList', userListSchema, 'userList')