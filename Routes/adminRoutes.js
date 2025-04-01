const { validate } = require('express-validation');
const { authorize } = require('../Middlewares/authenticate');

// Controllers
const { addEmployee, login, deleteEmployee, logout, getVisits } = require('../Controllers/adminControllers');

// Validations
const employeeValidate = require('../Validations/addEmployee');
const loginValidate = require('../Validations/login');

const router = require('express').Router()

// =============== GET Methods ========================

router.get('/login', async (req, res) => {
    try {
        res.render('Employee/login');
    } catch (error) {
        console.log("Error rendering login page:", error);
        res.status(500).send("Somthing went wrong. Please try again later");
    }
});

router.get('/register', authorize(["admin"]),(req, res) => {
    try {
        return res.render("Employee/register");
    } catch (error) {
        console.log("Error in rendering register page:- ",error.message);        
        return res.status(500).json({message: "Somthing went wrong. Please try again later"});
    }
})

// =============== POST Methods ========================

// Add New Employee
router.post("/register", authorize(["admin"]),validate(employeeValidate),addEmployee);

// Login Employee
router.post('/login', validate(loginValidate),login);

router.delete('/deleteEmployee/:id', authorize(["admin"]), deleteEmployee);

router.get('/getVisits',authorize(["admin"]),getVisits)

router.post('/logout',logout)

module.exports = router;