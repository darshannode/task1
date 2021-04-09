// Schemas
const userSchema = require('../Database/Schemas/users');

// Utils
let generateAccessToken = require('./../Utils/helpers').generateAccessToken;

class User {
    async register(data) {
        return await new userSchema(data).save();
    }

    async getUserByEmail(email) {
        return await userSchema.findOne({ email });
    }

    async getUserById(id) {
        return await userSchema.findOne({ id });
    }

    async login(user, data) {
        let token = generateAccessToken();

        user.authTokens.push(token);
        await user.save();

        return { authToken: token, _id: user._id }
    }
}

module.exports = User;