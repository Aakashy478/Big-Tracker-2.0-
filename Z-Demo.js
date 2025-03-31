// const mongoose = require("mongoose");
// const moment = require("moment");

// const empSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     mobile: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["user", "admin"], default: "user" },
//     isAdmin: { type: Boolean, default: false },
//     isDisable: { type: Boolean, default: false },
//     createdAt: { type: String, default: moment().format("YYYY-MM-DD HH:mm:ss") }
// });

// // Export the Employee model
// const Employee = mongoose.model("Employee", empSchema);
// module.exports = Employee;



// // Tracking Model
// const mongoose = require("mongoose");

// const discussionSchema = new mongoose.Schema({
//     startTime: { type: Date, required: true },
//     endTime: { type: Date, required: true },
//     audioFileUrl: { type: String, required: false } // Store audio discussion link
// });

// const visitSchema = new mongoose.Schema({
//     hospitalName: { type: String, required: true },
//     doctorName: { type: String, required: true },
//     startLocation: { type: String, required: true },
//     endLocation: { type: String, required: true },
//     note: { type: String, required: false },
//     discussions: [discussionSchema] // Multiple discussions per visit
// });

// const employeeTrackingSchema = new mongoose.Schema({
//     employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true }, // Reference Employee
//     checkInTime: { type: Date, required: true, default: Date.now }, // Auto-check-in time
//     checkInPlace: { type: String, required: true },
//     visits: [visitSchema], // Array of visits
//     checkOutTime: { type: Date } // Optional checkout time
// });

// // Create Model
// const EmployeeTracking = mongoose.model("EmployeeTracking", employeeTrackingSchema);

// // Export the model properly
// module.exports = EmployeeTracking;


// // Check-in
// async function checkInEmployee(employeeId) {
//     const newCheckIn = new EmployeeTracking({
//         employeeId,
//         checkInPlace: "Main Office",
//         visits: []
//     });

//     await newCheckIn.save();
//     console.log("✅ Employee Checked In:", newCheckIn);
// }

// // Replace with actual Employee ID after running `addEmployee`
// checkInEmployee("60c72b2f9b1e8a5a1c8d5a60");

// // Add a Visit

// async function addVisit(employeeId) {
//     const tracking = await EmployeeTracking.findOne({ employeeId });

//     if (!tracking) {
//         console.log("❌ Employee has not checked in!");
//         return;
//     }

//     tracking.visits.push({
//         hospitalName: "City Hospital",
//         doctorName: "Dr. John Doe",
//         startLocation: "Main Office",
//         endLocation: "City Hospital",
//         note: "Discussed medical equipment supply",
//         discussions: []
//     });

//     await tracking.save();
//     console.log("✅ Visit Added:", tracking);
// }

// // Replace with actual Employee ID
// addVisit("60c72b2f9b1e8a5a1c8d5a60");


// //Add a Discussion to a Visit

// async function addDiscussion(employeeId) {
//     const tracking = await EmployeeTracking.findOne({ employeeId });

//     if (!tracking || tracking.visits.length === 0) {
//         console.log("❌ No visit found!");
//         return;
//     }

//     // Adding discussion to the last visit
//     tracking.visits[tracking.visits.length - 1].discussions.push({
//         startTime: new Date(),
//         endTime: new Date(),
//         audioFileUrl: "https://example.com/audio.mp3"
//     });

//     await tracking.save();
//     console.log("✅ Discussion Added:", tracking);
// }

// // Replace with actual Employee ID
// addDiscussion("60c72b2f9b1e8a5a1c8d5a60");


// // 7️⃣ Check - Out Employee
// async function checkOutEmployee(employeeId) {
//     const tracking = await EmployeeTracking.findOne({ employeeId });

//     if (!tracking) {
//         console.log("❌ Employee has not checked in!");
//         return;
//     }

//     tracking.checkOutTime = new Date();
//     await tracking.save();

//     console.log("✅ Employee Checked Out:", tracking);
// }

// // Replace with actual Employee ID
// checkOutEmployee("60c72b2f9b1e8a5a1c8d5a60");
