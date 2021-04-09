const products = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        default : ""
    },
    barcode : {
        type : Number,
        trim : true,
        default : 0
    },
    brand : {
        type : String,
        trim : true,
        default : ""
    },
    description : {
        type : String,
        default : ""
    },
    price : {
        type : Number,
        default : 0
    },
    available : {
        type : Boolean,
        default : true
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('products', products);