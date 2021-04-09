const userSchema = require('./../../Database/Schemas/users')


class Authenticator {
    async authenticate(req, res, next) {
        let authToken = req.headers.authorization;
        if(!authToken) {
            res.handler.validationError(undefined, 'VALIDATION.TOKEN.INVALID');
            return false
        }
        const user =  await userSchema.findOne({
            authTokens : authToken
        })
        if(!user) {
            res.handler.unauthorized();
            return;
        }
        req.userInfo = user.toObject();
        next();
    }
}

module.exports = Authenticator;