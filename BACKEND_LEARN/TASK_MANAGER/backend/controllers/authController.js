const userModel = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")


const generatetoken = (userId) => {
    const token = jwt.sign({id:userId}, process.env.JWT_SECRET, { expiresIn:"7d" });
    return token;
}

// @desc Register a new user
// @route POST/api/auth/register
// @access Public

const registerUser = async (req,res) => {
    try{
        const {name, email, password, profileImageUrl, adminInviteToken } = req.body;

        //check if user already exists 

        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({message:"user already exists"})
        }

        // Determine user role: Admim if correct token is provided, otherwise Member
        let role="member";

        if( adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN){
            role = "admin"
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create a new user 
        const user = await userModel.create({
            name,
            email,
            password : hashedPassword,
            profileImageUrl,
            role
        });

        //return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            token: generatetoken(user._id)
        });

    }catch(error){
        res.status(500).json({message:"server error", error: error.message})
    }
}

// @desc login user
// @route POST/api/auth/login
// @access Public

const loginUser = async (req,res) => {
     try{
        const { email, password } = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(401).json({message:"Invalid email or password"})
        }

        // compare password
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password"})
        }

        //rerurn user details
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            token: generatetoken(user._id)
        });

    }catch(error){
        res.status(500).json({message:"server error", error: error.message})
    }
}

// @desc get user profile
// @route GET/api/auth/profile
// @access Private ( requires JWT)

const getUserProfile = async (req,res) => {
     try{

        const user = await userModel.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        res.json(user)
        
    }catch(error){
        res.status(500).json({message:"server error", error: error.message})
    }
}

// @desc update user profile
// @route PUT/api/auth/profile
// @access Private ( requires JWT)

const updateUserProfile = async (req, res) => {
     try{
        const user = await userModel.findById(req.user.id);
        
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt)
            user.password = hashedPassword;
        }

        const updateUser = await user.save();

        res.json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            role:updateUser.role,
        })

    }catch(error){
        res.status(500).json({message:"server error", error: error.message})
    }
}

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile}