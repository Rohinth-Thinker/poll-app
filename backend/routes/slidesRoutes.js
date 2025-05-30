const { Router } = require('express');
const { fetchSlides, addSlide, addOption, handleOptionName, handleQuestionLabel, getOptionsByParticipationId, incrementVote } = require('../controllers/slidesControllers');
const { validateToken } = require('../utils/tokenFunction');

const router = Router();

router.get('/fetch', validateToken, fetchSlides);
router.patch('/slide/add', validateToken, addSlide);
router.patch('/slide/option/add', validateToken, addOption);
router.patch('/slide/option/handle/optionName', validateToken, handleOptionName);
router.patch('/slide/question/handle/label', validateToken, handleQuestionLabel);

router.get('/slide/options/:participationId', getOptionsByParticipationId);
router.patch('/slide/option/increment', incrementVote);

module.exports = router;