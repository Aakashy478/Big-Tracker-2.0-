const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10; // Number of salt rounds
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Export functions
module.exports = { hashPassword, comparePassword };
