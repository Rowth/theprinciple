const jwt = require('jsonwebtoken');

const createToken = async (data, time) => {
    try {
        let userData = {
            _id: data.id,
            email: data.email
        }
        const token = await jwt.sign(userData, "138f530787df5fe97457bb228d6f6c85742ac4a8ce2a03d59e8c460fe01d8e7248505", { expiresIn: time });
        return token
    }
    catch (error) {
        return error
    }
}
const verifyTokens = async () => {
    try {
        const userVerify = await jwt.verify(token);
        return userVerify
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    createToken,
    verifyTokens
}