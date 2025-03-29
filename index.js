require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/db');
const app = express();

// Import Routes
const routes = require('./Routes/index.Routes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/images'));

// Set the view engine (EJS example)
app.set('view engine', 'ejs');


//Connect to mongoDB
connectDB();

app.use('/api',routes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listen on http://localhost:${port}`);
})

