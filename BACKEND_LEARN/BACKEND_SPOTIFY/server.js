require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT;

connectDB();

app.listen(3000,() => {
    console.log("App running on port no : 3000")
})

