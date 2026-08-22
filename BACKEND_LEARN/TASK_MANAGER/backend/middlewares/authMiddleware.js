const jwt = require('jsonwebtoken');

const UserModel = require("../models/User")

// Middleware to protect Routes

const protect = async (req, res , next)=>{

    try{
        let token = req.headers.authorization;

        if( token && token.startsWith("Bearer")){
            token = token.split(" ")[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserModel.findById(decoded.id).select("-password");
            console.log("user from protect",req.user)
            next();
        }else{
            res.status(401).json({
                message:"Not authorized, no token"
            });
        }
    }catch(error){
        res.status(401).json({message:"Token failed", error: error.message})
    }
    
}

// Middleware for admin only routes

const adminOnly = (req, res, next) => {
    console.log("User Role: ",req.user)
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(403).json({message:"Access denied, Admin only"})
    }

}

module.exports = {protect, adminOnly}