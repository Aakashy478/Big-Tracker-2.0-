const moment = require('moment');
const EmployeeTracking = require('../Models/EmployeeTracking');

const checkIn = async (req, res) => {
    try {
        console.log("Inside check-in method: Post");

        const { location } = req.body;
        const employeeId = req.user._id;

        const checkIn = await EmployeeTracking.findOne({ employeeId });
        console.log("checkIn:- ", checkIn);

        if (checkIn) {
            return res.status(400).json({ success: true, message: "User is already check-in." });
        }

        const newCheckIn = new EmployeeTracking({
            employeeId,
            checkInPlace: location
        })

        await newCheckIn.save();
        res.status(200).json({ success: true, message: "Your check-in time start now" })
    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ success: false, message: "Somthing went wrong. Please try again later." });

    }
}

const checkOut = async (req, res) => {
    try {
        const employeeId = req.user._id;

        //Find the existing check-in or not
        const tracking = await EmployeeTracking.findOne({ employeeId });

        if (!tracking) {
            return res.status(400).json({ message: "User has not ckecked in." });
        }

        if (tracking.checkInTime) {
            return res.status(400).json({ message: "User has already checked out." });
        }

        tracking.checkOutTime = moment().format("hh:mm A");

        await tracking.save();

        res.status(200).json({ message: `Yout check-out time ${checkInStatus.checkOutTime} for the day.` });
    } catch (error) {
        console.log("Error in Check out user:- ", error.message);
        return res.status(500).json({ message: "Somthing went wrong. Please try again later." });
    }
}

const doctorDetails = async (req, res) => {
    try {
        console.log(req.body);
        
        const { doctorName } = req.body;
        const doctorImage = req.file ? req.file.filename : "";

        const tracking = await EmployeeTracking.findOne({ employeeId: req.user._id });

        if (!tracking) {
            return res.status(400).json({ message: "User has not checked in." });
        }

        // Create a new visit object
        const newVisit = {
            doctorName,
            doctorImage,
            startLocation: "21.1702° N, 72.8311° E",
        };

        // Push the new visit and save
        tracking.visits.push(newVisit);
        await tracking.save();

        
        // Render the page and pass data
        res.status(200).render('Employee/Visit/hospital');

    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};


// Visit Hospital Details
const hospitalDetails = async (req, res) => {
    try {
        console.log(req.body);
        const { hospitalName } = req.body;
        const hospitalImage = req.file ? req.file.filename : "";

        const tracking = await EmployeeTracking.findOne({ employeeId: req.user._id });

        if (!tracking) {
            return res.status(400).json({ message: "User has not checked in." })
        }

        // Get the last visit ID (which is the newly added one)
        const currentVisitId = tracking.visits[tracking.visits.length - 1]._id;


        const result = await EmployeeTracking.updateOne(
            {
                employeeId: req.user._id,
                "visits._id": currentVisitId  // Find the specific visit by ID
            },
            {
                $set: {
                    "visits.$.hospitalName": hospitalName,
                    "visits.$.hospitalImage": hospitalImage
                }
            }
        );


        console.log("result:- ",result);
        

        res.status(200).json({ message: "Visit details successfully filled." });
    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};


module.exports = { checkIn, doctorDetails, hospitalDetails, checkOut };