
const { Router } = require('express');
const authRoutes = require('./authRoutes');
const slidesRoutes = require('./slidesRoutes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/slides', slidesRoutes);

module.exports = router;