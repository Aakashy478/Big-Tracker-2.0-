const moment = require('moment');
const EmployeeTracking = require('../Models/EmployeeTracking');

const checkIn = async (req, res) => {
    try {
        const { location } = req.body;
        const employeeId = req.user._id;

        const existingTracking = await EmployeeTracking.findOne({ employeeId, checkOutTime: null });
        console.log("existingTracking:- ", existingTracking);

        if (existingTracking) {
            return res.status(400).json({ success: true, message: "User is already check-in." });
        }

        const newtracking = new EmployeeTracking({
            employeeId,
            checkInPlace: location
        })

        const currentTime = moment().format('hh:mm A');

        await newtracking.save();

        console.log(`Your check-in time ${currentTime} start now`);

        res.status(200).json({ success: true, message: `Your check-in time ${currentTime} start now` })
    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ success: false, message: "Somthing went wrong. Please try again later." });

    }
}

const checkOut = async (req, res) => {
    try {
        const employeeId = req.user._id;

        const tracking = await EmployeeTracking.findOne({ employeeId });

        if (!tracking) {
            return res.status(400).json({ message: "User has not checked in." });
        }

        if (tracking.checkOutTime) {
            return res.status(400).json({ message: "User has already checked out." });
        }

        const checkOutTime = new Date();

        await EmployeeTracking.updateOne(
            { _id: tracking._id },
            { $set: { checkOutTime } }
        );

        console.log(`Your check-out time is ${checkOutTime} for the day.`);

        res.status(200).json({ message: `Your check-out time is ${checkOutTime} for the day.` });
    } catch (error) {
        console.error("Error in check-out user:", error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};


const doctorDetails = async (req, res) => {
    try {
        console.log(req.body);

        const { doctorName } = req.body;
        const doctorImage = req.file ? req.file.filename : "";

        const tracking = await EmployeeTracking.findOne({ employeeId: req.user._id, checkOutTime: null });

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
        res.status(200).json({ message: "Submited doctor details successfully!" });

    } catch (error) {
        console.log("Error in Check-in:- ", error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};


const startDiscussion = async (req, res) => {
    try {
        console.log(req.file);
        const tracking = await EmployeeTracking.findOne({ employeeId: req.user._id, checkOutTime: null });

        if (!tracking) {
            return res.status(400).json({ message: "User has not checked in." });
        }

        if (tracking.visits.length === 0) {
            return res.status(400).json({ message: "User can first start visit" });
        }

        const currectVisit = tracking.visits.find(visit => visit.visitEndTime === null);

        console.log("currectVisit:- ", currectVisit);

        const currectDiscussion = currectVisit.discussions.find(discussion => discussion.endTime === null);

        console.log("currectDiscussion:- ", currectDiscussion);

        currectDiscussion.audioFileUrl = req.file ? req.file.filename : null;
        currectDiscussion.endTime = moment().toISOString();

        await tracking.save();

        res.status(200).json({ message: "audio sended successfully" });
    } catch (error) {
        console.log("Erroor in startDiscussion:- ", error.message);
        return res.status(500).json({ message: "Somthing went wrong. Please try again later" });
    }
}

const overDiscussion = async (req, res) => {
    try {
        console.log(req.body);
        
        res.status(200).json({ message: "Discussion overed successfully!" });
    } catch (error) {
        console.log("Erroor in startDiscussion:- ", error.message);
        return res.status(500).json({ message: "Somthing went wrong. Please try again later" });
    }
}


module.exports = { checkIn, doctorDetails, checkOut, startDiscussion, overDiscussion };