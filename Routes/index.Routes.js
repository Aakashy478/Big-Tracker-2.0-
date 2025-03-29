const router = require('express').Router();
const userRoutes = require('./empRoutes');

router.use('/user', userRoutes);

module.exports = router;