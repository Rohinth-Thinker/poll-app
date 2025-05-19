const { fetchSlidesByUserId, addSlideInDB, updateUserSlideList, } = require("../database/dbFunctions");
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
        const updateResponse = await updateUserSlideList(userId, newSlide.id);

        res.status(200).json({newSlide});
    } catch(err) {
        console.log('At addSlide Controller, ', err.name, err.msg);
        res.status(400).json({error: 'An error occured, Try again later...'});
    }
}

module.exports = {
    fetchSlides, addSlide,
}