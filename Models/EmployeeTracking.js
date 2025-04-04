const mongoose = require("mongoose");
const moment = require("moment");

const discussionSchema = new mongoose.Schema({
    startTime: { type: Date, default: moment().toDate() },
    notes: { type: String, default: null },
    audioFile: { type: String, default: null },
    endTime: { type: Date, default: null },
});

const visitSchema = new mongoose.Schema({
    doctorName: { type: String, default: null },
    doctorImage: { type: String, default: null },
    startLocation: { type: String, default: null },
    visitStartTime: {type: Date,required: true,default: moment().toDate()},
    discussions: [discussionSchema],  // Array of discussion
    endLocation: { type: String, default: null },
    visitEndTime: { type: Date, default: null },
});


const employeeTrackingSchema = new mongoose.Schema({
    employeeId: { type: String, ref: "Employee", required: true }, checkInTime: { type: Date, required: true, default: moment().toDate() },
    checkInPlace: { type: String, default: "" },
    visits: [visitSchema], // Array of visits
    checkOutTime: { type: Date, default: null }
});

const EmployeeTracking = mongoose.model("EmployeeTracking", employeeTrackingSchema);

module.exports = EmployeeTracking;
