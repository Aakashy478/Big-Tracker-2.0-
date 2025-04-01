const moment = require('moment');
const EmployeeTracking = require('../Models/EmployeeTracking');

const checkIn = async (req, res) => {
    try {
        const {location} = req.body;
        const employeeId = req.user._id;
      
        const checkIn = await EmployeeTracking.findOne({ employeeId });
        console.log("checkIn:- ", checkIn);
        
        if (checkIn) {
            return res.status(400).json({ message: "User is already check-in." });
        }

        const newCheckIn = new EmployeeTracking({
            employeeId,
            checkInPlace:location
        })

        await newCheckIn.save();
        res.status(200).json({ message: "Your check-in time start now" })
    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ message: "Somthing went wrong. Please try again later." });

    }
}

const startVisit = async (req, res) => {
    try {
        const tracking = await EmployeeTracking.findOne({ employeeId: req.user._id });
        console.log(tracking);
        if (!tracking) {
            return res.status(400).json({ error: "Employee has not checked in!" });
        }
        res.render('Employee/Visit/doctor')
        
    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ message: "Somthing went wrong. Please try again later." });

    }
}

module.exports = { checkIn ,startVisit};