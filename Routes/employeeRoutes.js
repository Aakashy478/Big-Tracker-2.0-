const { checkIn, startVisit } = require('../Controllers/userControllers');
const { authorize } = require('../Middlewares/authenticate');

const router = require('express').Router();

// =============== GET Methods ========================

router.get('/home', authorize(["user"]), async (req, res) => {
    try {
        res.render('Employee/home');
    } catch (error) {
        console.log("Error in redering home page:- ", error.message);
        res.status(500).json({ message: "Somthing went wrong. Please try again later." });
    }
})

router.get('/check-in', authorize(["user"]), (req, res) =>{
    try {
        res.render('Employee/location');
    } catch (error) {
        console.log("Error in redering location page:- ", error.message);
        res.status(500).json({ message: "Somthing went wrong. Please try again later." });
    }
})

router.get('/startVisit', authorize(["user"]), startVisit);

// =============== POST Methods ========================

// Check in
router.post('/check-in', authorize(["user"]), checkIn);


module.exports = router;