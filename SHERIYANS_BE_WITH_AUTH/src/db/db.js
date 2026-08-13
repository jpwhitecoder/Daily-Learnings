const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

async function connectDB (){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connected successfully")
    }catch(err){
        console.error("Database connection error:", err)
    }
}

module.exports = connectDB;