const router = require('express').Router();
const adminRoutes = require('./adminRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/admin', adminRoutes);
router.use('/user', employeeRoutes);

module.exports = router;