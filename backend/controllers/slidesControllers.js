const { fetchSlidesByUserId } = require("../database/dbFunctions");

async function fetchSlides(req, res) {
    try {
        const {userId} = req;
        const response = await fetchSlidesByUserId(userId);
        res.status(200).json(response.slideList);
    } catch(err) {
        console.log('At fetchSlides controller, ', err.name, err.msg);
        res.status(400).json({error: 'An error occured, Try again later...'});
    }
}

module.exports = {
    fetchSlides,
}