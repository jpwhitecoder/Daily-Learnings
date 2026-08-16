const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const connectDB = async () => {
   try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully")
   }catch(err){
        console.error("Data connection errror:", err)
   }
    
}

module.exports = connectDB;