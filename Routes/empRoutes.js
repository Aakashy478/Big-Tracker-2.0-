const { validate } = require('express-validation');
const { addEmployee, login, deleteEmployee, logout } = require('../Controllers/empController');
const { authorize } = require('../Middlewares/authenticate');
const employeeValidate = require('../Validations/addEmployee');
const loginValidate = require('../Validations/login');

const router = require('express').Router()

// =============== GET Methods ========================

router.get('/login', async (req, res) => {
    try {
        res.render('Employee/login');
    } catch (error) {
        console.log("Error rendering login page:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/register', authorize(["admin"]),(req, res) => {
    try {
        return res.render("Employee/register");
    } catch (error) {
        return res.status(500).json({message: "Somthing went wrong. Please try again later"});
    }
})


// =============== POST Methods ========================

// Add New Employee
router.post("/register", authorize(["admin"]),validate(employeeValidate),addEmployee);

// Login Employee
router.post('/login', validate(loginValidate),login);

router.delete('/deleteEmployee/:id', authorize(["admin"]), deleteEmployee);

router.post('/logout',logout)

module.exports = router;