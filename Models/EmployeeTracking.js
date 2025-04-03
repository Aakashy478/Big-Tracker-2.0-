const mongoose = require("mongoose");
const moment = require("moment");

const discussionSchema = new mongoose.Schema({
    startTime: { type: Date, default: moment().toDate() },
    endTime: { type: Date, default:null },
    note: { type: String, default:"" },
    audioFileUrl: { type: String, default:null } // Store audio discussion link
});

const visitSchema = new mongoose.Schema({
    doctorName: { type: String, default: null },
    doctorImage: { type: String, default: null }, // Image URL or file path
    startLocation: { type: String, default: null },
    endLocation: { type: String, default: null },
    visitStartTime: {
        type: Date,
        required: true,
        default: () => moment().toDate() // Stores the full date-time
    },
    visitEndTime: { type: Date, default: null }, // Will be set manually when visit ends
    discussions: [discussionSchema] // Multiple discussions per visit
});


const employeeTrackingSchema = new mongoose.Schema({
    employeeId: { type: String, ref: "Employee", required: true }, // Reference Employee
    checkInTime: {
        type: Date,
        required: true,
        default: () => moment().toDate() // Stores both date and time
    },
    checkInPlace: { type: String, default: "" },
    visits: [visitSchema], // Array of visits
    checkOutTime: {
        type: Date,
        default: null
    }
});

// Create Model
const EmployeeTracking = mongoose.model("EmployeeTracking", employeeTrackingSchema);

// Export the model properly
module.exports = EmployeeTracking;
