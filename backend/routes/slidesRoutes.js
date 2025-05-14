const { Router } = require('express');
const { fetchSlides } = require('../controllers/slidesControllers');
const { validateToken } = require('../utils/tokenFunction');

const router = Router();

router.get('/fetch', validateToken, fetchSlides);

module.exports = router;