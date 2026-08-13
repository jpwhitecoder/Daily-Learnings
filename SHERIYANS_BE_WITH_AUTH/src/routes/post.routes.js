const express = require('express');
const jwt = require("jsonwebtoken")
require("dotenv").config();
const userModel = require("../models/user.model")

const router = express.Router();

router.post("/create", async (req, res) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET);

       const user = await userModel.findOne({
            _id : decoded.id
       });

    }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }

    console.log(req.body);
    console.log(req.cookies);
    res.send("post created successfully")
})

module.exports = router;