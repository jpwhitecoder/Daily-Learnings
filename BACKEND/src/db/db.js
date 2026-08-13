const mongoose = require("mongoose");

const dns = require("dns");
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

async function connectDB() {
    await mongoose.connect("mongodb url");

    console.log("connected to DB");
}

connectDB();

module.exports = connectDB;