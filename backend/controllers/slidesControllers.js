const { fetchSlidesByUserId, addSlideInDB, updateUserSlideList, addOptionInSlide, handleOptionNameInSlide, handleQuestionLabelInSlide, } = require("../database/dbFunctions");
const slidesArray = require("../models/slidesArrayModel");
const { io } = require("../socket/socket");
const generateParticipationId = require("../utils/generateParticipationId");

async function fetchSlides(req, res) {
    try {
        const {userId} = req;
        if(!userId) {
            return res.status(400).json({error: "Invalid token"});
        }

        const response = await fetchSlidesByUserId(userId);
        res.status(200).json(response.slideList);
    } catch(err) {
        console.log('At fetchSlides controller, ', err.name, err.msg);
        res.status(400).json({error: 'An error occured, Try again later...'});
    }
}

async function addSlide(req, res) {
    try{
        const {userId} = req;
        const s = req.body;
        if(!userId) {
            return res.status(400).json({error: "Invalid token"});
        }

        const participationId = generateParticipationId();
        const slide = {...s, participationId};

        const newSlide = await addSlideInDB(slide);
        await updateUserSlideList(userId, newSlide.id);

        res.status(200).json({newSlide});
    } catch(err) {
        console.log('At addSlide Controller, ', err.name, err.msg);
        res.status(400).json({error: 'An error occured, Try again later...'});
    }
}

async function addOption(req, res) {
    try{
        const {selectedSlideId, optionName, participationId} = req.body;
        if(!selectedSlideId) {
            return res.status(400).json({error: 'Invalid selected slide ID'});
        }

        const newOption = await addOptionInSlide(selectedSlideId, optionName);
        if(!newOption) {
            return res.status(400).json({error: 'Invalid selected slide ID'});
        }

        io.to(participationId).emit('added_newOption', newOption);
        res.status(200).json(newOption);
    } catch(err) {
        console.log('At addOption controller, ', err.name, err.msg);
        res.status(400).json({error: 'An error occured, Try again later'});
    }
}

async function handleOptionName(req, res) {
    try {
        const {selectedSlideId, optionId, optionName, participationId} = req.body;
        if(!selectedSlideId || !optionId) {
            return res.status(400).json({error: 'Invalid Ids'});
        }

        const response = await handleOptionNameInSlide(selectedSlideId, optionId, optionName);
        io.to(participationId).emit('changed_optionName', optionId, optionName);
        res.status(200).json(response);
    } catch(err) {
        console.log('At handleOptionName controller, ', err.name, err.msg);
        res.status(400).json({error: 'An error occured, Try again later'});
    }
}

async function handleQuestionLabel(req, res) {
    try {
        const {selectedSlideId, questionText, participationId} = req.body;
        if(!selectedSlideId) {
            return res.status(400).json({error: 'Invalid selected Id'});
        }

        const response = await handleQuestionLabelInSlide(selectedSlideId, questionText);
        io.to(participationId).emit('changed_questionLabel', questionText);
        res.status(200).json(response);
    } catch(err) {
        console.log('At handleQuestionLabel controller, ', err.name, err.msg);
        res.status(400).json({error: 'An error occured, Try again later...'});
    }
}

async function getOptionsByParticipationId(req, res) {
    const { participationId } = req.params;
    const response = await slidesArray.findOne({ participationId }).select("multipleChoice.options question");
    // console.log(response);
    const options = response.multipleChoice.options;
    const question = response.question.label;
    res.status(200).json({options, question, selectedSlideId: response._id});
}

async function incrementVote(req, res) {
    const { participationId, optionId } = req.body;

    const response = await slidesArray.updateOne(
        {participationId, "multipleChoice.options._id": optionId},
        {
            $inc : {
                "multipleChoice.options.$.optionVote": 1,
                "multipleChoice.totalVote": 1,
            }
        }
    )

    io.emit("vote_incremented", participationId, optionId);
    res.status(200).json(response);
}

module.exports = {
    fetchSlides, addSlide, addOption, handleOptionName, handleQuestionLabel,
    getOptionsByParticipationId, incrementVote,
}