const users = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        default : ""
    },
    email : {
        type : String,
        trim : true,
        default : ""
    },
    password : {
        type : String,
        trim : true,
        default : ""
    },
    gender : {
        type : String,
        default : ""
    },
    phoneNumber : {
        type : String,
        default : ""
    },
    role : {
        type : String,
        default : "client"
    },
    authTokens : [String]
}, {
    timestamps : true
})

module.exports = mongoose.model('users', users);