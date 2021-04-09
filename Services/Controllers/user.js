// Modal
const userModel = new (require('./../Models/user'))();

// Configs
const encrypt = new (require('./../Configs/encrypt'))();
const fileManager = new (require('./../Configs/fileManager'))();
const { PATHS } = require('./../Configs/constants')

class UsersController {
    async register(req, res) {
        try {
            let user = await userModel.getUserByEmail(req.body.email);

            if (user) res.handler.conflict();

            req.body.password = encrypt.encryptEntity(req.body.password);
            let data = await userModel.register(req.body);

            res.handler.success(data.data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    async login(req, res) {
        try {
            let user = await userModel.getUserByEmail(req.body.email);

            if (!user) res.handler.notFound();

            let valid = encrypt.compareEncryptEntity(req.body.password, user.password);

            if (!valid) return res.handler.unauthorized(undefined, 'Username or Password is incorrect.');

            let data = await userModel.login(user, req.body)

            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    async getUserProfile(req, res) {
        try {
            let data = req.userInfo;

            return res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = UsersController;
