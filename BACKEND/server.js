// server start
const express = require("express")
const app = require("./src/app");
const connectDB = require("./src/db/db");

// const notes = []

// app.use(express.json());

/*  POST NOTES   */

// app.post("/notes",(req,res)=>{
//     notes.push(req.body);
//     res.status(201).json({
//         message:"Note created successfully"
//     })
// })

/* GET NOTES */

// app.get("/notes",(req,res)=>{
//     res.status(200).json({
//         message:"notes fetched successfully",
//         notes:notes
//     })
// })

connectDB();

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})