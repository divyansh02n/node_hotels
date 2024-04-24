const mongoose = require('mongoose');


const url = 'mongodb://127.0.0.1:27017/hotels'

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
