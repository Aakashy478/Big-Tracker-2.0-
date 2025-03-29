const router = require('express').Router()

// =============== GET Methods ========================
router.get('/login', (req, res) => {
    res.render('Employee/login');
})


// =============== POST Methods ========================
// Add New Employee
router.post("/register",);

module.exports = router;