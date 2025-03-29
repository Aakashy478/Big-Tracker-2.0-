const addEmployee = async(req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: "Employee Added successfully!" });
    } catch (error) {
        console.log("Error in addEmployee:- ", error.message);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

module.exports = { addEmployee };