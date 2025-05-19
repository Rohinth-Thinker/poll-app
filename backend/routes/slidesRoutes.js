const { Router } = require('express');
const { fetchSlides, addSlide } = require('../controllers/slidesControllers');
const { validateToken } = require('../utils/tokenFunction');

const router = Router();

router.get('/fetch', validateToken, fetchSlides);
router.post('/slide/add', validateToken, addSlide);

module.exports = router;