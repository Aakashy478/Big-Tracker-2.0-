const mongoose = require("mongoose");
const moment = require("moment");

const discussionSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    audioFileUrl: { type: String, required: false } // Store audio discussion link
});

const visitSchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    doctorName: { type: String, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    note: { type: String, required: false },
    discussions: [discussionSchema] // Multiple discussions per visit
});

const employeeTrackingSchema = new mongoose.Schema({
    employeeId: { type: String, ref: "Employee", required: true }, // Reference Employee
    checkInTime: {
        type: String,
        required: true,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss") // Format time using Moment.js
    },
    checkInPlace: { type: String, required: true },
    visits: [visitSchema], // Array of visits
    checkOutTime: {
        type: String,
        default: null // Checkout time will be formatted when set
    }
});

// Create Model
const EmployeeTracking = mongoose.model("EmployeeTracking", employeeTrackingSchema);

// Export the model properly
module.exports = EmployeeTracking;
