const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

//BUILD A CONNECTION
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
}).then(() => { console.log('Connected To database :)')})
.catch( err => console.log('error', err));

module.exports.mongoose = mongoose