const jwt =  require('jsonwebtoken');

const generateToken = (username) => {
    const secretKey = process.env.JWT_SECRET || 'your_secret_key'
    return jwt.sign({username}, secretKey, {expiresIn: '1d'})
};

module.exports = {generateToken};