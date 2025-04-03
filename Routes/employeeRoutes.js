const { checkIn, checkOut, doctorDetails, startDiscussion, overDiscussion } = require('../Controllers/userControllers');
const EmployeeTracking = require('../Models/EmployeeTracking');
const { authorize } = require('../Middlewares/authenticate');
const { upload } = require('../Middlewares/uploadImage');
const { uploadAudio } = require('../Middlewares/uploadAudio');
const moment = require('moment');

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

router.get('/check-in', authorize(["user"]), async (req, res) => {
    try {
        const tracking = await EmployeeTracking.findOne({ employeeId: req.user._id, checkOutTime: null });

        if (tracking) {
            return res.status(400).json({ message: "User is alrady checked in." })
        }

        res.status(200).render('Employee/location');
    } catch (error) {
        console.log("Error in redering location page:- ", error.message);
        res.status(500).json({ message: "Somthing went wrong. Please try again later." });
    }
})

router.get('/startVisit', authorize(["user"]), async (req, res) => {
    try {
        const checkIn = await EmployeeTracking.findOne({ employeeId: req.user._id, checkOutTime: null });
        console.log(checkIn);

        if (!checkIn) {
            return res.status(404).json({ message: "User has not checked in!" });
        }

        console.log("visits:-", checkIn.visits.find(visit => visit.visitEndTime === null));

        // const currentVisitEndTime = checkIn.visits[checkIn.visits.length - 1].visitEndTime;

        const currentVisitEndTime = checkIn.visits.find(visit => visit.visitEndTime === null);

        console.log(currentVisitEndTime);
        if (currentVisitEndTime) {
            return res.status(400).json({ message: "User is already visit in this side." });
        }


        res.status(200).render("Employee/Visit/doctor");
    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
});
router.get('/startDiscussion', authorize(["user"]), async (req, res) => {
    try {
        const tracking = await EmployeeTracking.findOne({ employeeId: req.user._id })

        console.log(tracking);
        if (!tracking) {
            return res.status(404).json({ message: "User tracker can't start .Please check in" });
        }



        const activeVisit = tracking.visits.find(visit => visit.visitEndTime === null);
        console.log(activeVisit);

        if (!activeVisit) {
            return res.status(400).json({ message: "User visit can't start. Please start visit" });
        }

        const startTime = moment().toDate();

        // Create a new Discussion
        const newDiscussion = {
            startTime,
        }

        activeVisit.discussions.push(newDiscussion);

        await tracking.save();
        res.status(200).render("Employee/discussion");
    } catch (error) {
        console.log("Erroor in startDiscussion:- ", error.message);
        return res.status(500).json({ message: "Somthing went wrong. Please try again later" });
    }
});

router.get('/overDiscussion', authorize(["user"]),
    async (req, res) => {
        try {
            res.status(200).render("Employee/notes")
        } catch (error) {
            console.log("Erroor in startDiscussion:- ", error.message);
            return res.status(500).json({ message: "Somthing went wrong. Please try again later" });
        }
    });

// =============== POST Methods ========================

// Check In
router.post('/check-in', authorize(["user"]), checkIn);

//Check Out
router.post('/check-out', authorize(["user"]), checkOut);

// Visit Doctor Details 
router.post('/visit/doctorDetails', upload.single('doctorImage'), authorize(["user"]), doctorDetails);

// Start Discussion
router.post('/startDiscussion', uploadAudio.single('audio'), authorize(["user"]), startDiscussion);

// Over Discussion
router.post('/overDiscussion', uploadAudio.single('audio'), authorize(["user"]),overDiscussion);


module.exports = router;