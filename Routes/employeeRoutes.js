const router = require('express').Router();
const { authorize } = require('../Middlewares/authenticate');
const { validate } = require('express-validation');
const { upload } = require('../Middlewares/uploadImage');
const { uploadAudio } = require('../Middlewares/uploadAudio');

// Inmport controllers
const { login, checkIn, checkOut, startVisit, startDiscussion, overDiscussion, logout, getLocation, overVisit } = require('../Controllers/userControllers');

// Import models
const loginValidate = require('../Validations/login');

// =============== POST Methods ========================

// Login Employee
router.post('/login', validate(loginValidate), login);

// Check In
router.post('/check-in', authorize(["user"]), checkIn);

// getLocation
router.post('/getLocation', authorize(["user"]), getLocation);

// Visit Doctor Details 
router.post('/startVisit', upload.single('doctorImage'), authorize(["user"]), startVisit);

// Start Discussion
router.post('/startDiscussion', authorize(["user"]), startDiscussion);

// Over Discussion
router.post('/overDiscussion', uploadAudio.single('audio'), authorize(["user"]), overDiscussion);

router.post('/overVisit', authorize(['user']), overVisit);

// Check Out
router.post('/check-out', authorize(["user"]), checkOut);

// Logout
router.post('/logout', logout);


module.exports = router;