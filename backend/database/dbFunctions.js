const { default: mongoose } = require("mongoose");
const slidesArray = require("../models/slidesArrayModel");
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

async function addSlideInDB(slide) {
    try {
        const response = await slidesArray.create(slide);
        return response;
    } catch(err) {
        throw err;
    }
}

async function updateUserSlideList(userId, slideId) {
    try {
        const response = await userList.updateOne({_id: userId}, {$push: {slideList: slideId}});
        return response;
    } catch(err) {
        throw err;
    }
}

async function addOptionInSlide(slideId, optionName) {
    try {
        const newOption = {
            _id: new mongoose.Types.ObjectId(),
            optionName,
            optionPhoto: null,
            optionVote: 0,
        }

        const response = await slidesArray.updateOne(
            {_id: slideId},
            {$push: {"multipleChoice.options": newOption}},
        )

        if(!response.modifiedCount) return null;
        return newOption;
    } catch(err) {
        throw err;
    }
}

async function handleOptionNameInSlide(selectedSlideId, optionId, optionName) {
    try {
        const response = await slidesArray.updateOne(
            {_id: selectedSlideId, 'multipleChoice.options._id': optionId},
            {'multipleChoice.options.$.optionName': optionName}
        )

        return response;
    } catch(err) {
        throw err;
    }
}

async function handleQuestionLabelInSlide(selectedSlideId, questionText) {
    try {
        const response = await slidesArray.updateOne(
            {_id: selectedSlideId}, {question: {label: questionText}}
        );

        return response;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    checkExistEmail, addUser, findUserById,
    fetchSlidesByUserId, addSlideInDB, updateUserSlideList, addOptionInSlide,
    handleOptionNameInSlide, handleQuestionLabelInSlide,
}