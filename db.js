const mongoose = require('mongoose');

require("dotenv").config();
const url = process.env.MONGODB_URL_LOCAL

mongoose.connect(url, {
    useNewUrlParser : true,
    useUnifiedTopology :true
}).then( () => {
    console.log("MongoDB is Connected.")
}).catch((err) => {
console.err('Error while connecting to database :', err)
})


mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
})

module.exports = mongoose.connection;
