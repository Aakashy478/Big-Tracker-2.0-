const { checkIn, checkOut, doctorDetails, hospitalDetails } = require('../Controllers/userControllers');
const EmployeeTracking = require('../Models/EmployeeTracking');
const { authorize } = require('../Middlewares/authenticate');
const { upload } = require('../Middlewares/uploadImage');

const router = require('express').Router();

// =============== GET Methods ========================

router.get('/home', authorize(["user"]), async (req, res) => {
    try {
        res.status(200).render('Employee/home');
    } catch (error) {
        console.log("Error in redering home page:- ", error.message);
        res.status(500).json({ message: "Somthing went wrong. Please try again later." });
    }
})

router.get('/check-in', authorize(["user"]), (req, res) =>{
    try {
        res.status(200).render('Employee/location');
    } catch (error) {
        console.log("Error in redering location page:- ", error.message);
        res.status(500).json({ message: "Somthing went wrong. Please try again later." });
    }
})

router.get('/startVisit', authorize(["user"]), async (req, res) => {
    try {
        const checkIn = await EmployeeTracking.findOne({ employeeId: req.user._id });
        console.log(checkIn);

        if (!checkIn) {
            return res.status(404).json({ message: "Employee has not checked in!" });
        }

        res.status(200).render("Employee/Visit/doctor");
    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
});

// =============== POST Methods ========================

// Check In
router.post('/check-in', authorize(["user"]), checkIn);

//Check Out
router.post('/check-out', authorize(["user"]), checkOut);

// Visit Doctor Details 
router.post('/visit/doctorDetails', upload.single('doctorImage'), authorize(["user"]), doctorDetails);

// Visit Hospital Details 
router.post('/visit/hospitalDetails', upload.single('hospitalImage'), authorize(["user"]), hospitalDetails);

module.exports = router;