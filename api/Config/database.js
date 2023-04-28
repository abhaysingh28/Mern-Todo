const mongoose = require('mongoose');

exports.databaseconnection = async() => {
    try{
        mongoose.connect(process.env.MONGO_URL || "mongodb+srv://yash:yash@cluster0.gpgoazj.mongodb.net/test");
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed ');
    }
}   
