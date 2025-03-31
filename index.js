require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const connectDB = require('./Config/db');
const app = express();

// Import Routes
const routes = require('./Routes/index.Routes');
const { errorHandler } = require('./Middlewares/errorHandler');
const Employee = require('./Models/Employee');
const { authorize } = require('./Middlewares/authenticate');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/images'));
app.use(cookieParser()); // Parse cookies

// Set the view engine (EJS example)
app.set('view engine', 'ejs');


//Connect to mongoDB
connectDB();

// Route to Render the Admin Dashboard
app.get("/admin",authorize(["admin"]), async(req, res) => {
    const users = await Employee.find({ isAdmin: false, isDisable: false });
    res.render("Admin/home", {
        users: users,
        visits: []
    });
});


app.use('/api', routes);

app.use(errorHandler);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listen on http://localhost:${port}`);
})

