const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const connectDB = async () => {

   await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to DB")

}

connectDB();

module.exports = connectDB;