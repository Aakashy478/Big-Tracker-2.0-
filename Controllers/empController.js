const { generateToken } = require("../Middlewares/authenticate");
const Employee = require("../Models/Employee");
const { comparePassword } = require("../Utils/passwordUils");

const addEmployee = async(req, res) => {
    try {
        console.log(req.body);
        const { name, mobile, email, username, password } = req.body;
        
        const existsUser = await Employee.findOne({ email });

        if (existsUser) {
            return res.status(400).json({message:"Email is already register. Please log in."})
        }

        const newUser = {
            name,
            mobile,
            email,
            password,
            username,
        }

        await Employee.create(newUser);

        res.status(200).json({ message: "Employee Added successfully!" });
    } catch (error) {
        console.log("Error in addEmployee:- ", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        
        const user = await Employee.findOne({ username ,isDisable:false});

        if (!user) {
            return res.status(404).json({message: "Invailid username. Enter valid username."})
        }

        const isMatch = await comparePassword(password, user.password);
        console.log("isMatch:- ",isMatch);
        
        if (!isMatch) {
            return res.status(404).json({ message: "Invailid password. Enter valid username." });
        }

        const token = generateToken(user, res);
        req.user = user;

        res.status(200).json({ message: "Login successfully!" });
    } catch (error) {
        console.log("Error in login:- ", error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        console.log("Request Params:", req.params);
        const empId = req.params.id;

        const employee = await Employee.findOne({ _id: empId });
        console.log("Employee Found:", employee);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found!" });
        }

        // Soft Delete (Mark as Disabled)
        employee.isDisable = true;
        await employee.save();

        res.status(200).json({ message: "Employee disabled successfully!" });
    } catch (error) {
        console.log("Error in Delete Employee:", error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// Logout
const logout = async (req, res) => {
    try {
        // Clear the authentication token from cookies
        res.clearCookie("authToken");

        // Redirect to the login page or send a response
        res.redirect("/api/user/login");
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ message: "Something went wrong. Try again later." });
    }
};

module.exports = { addEmployee ,login,deleteEmployee,logout};