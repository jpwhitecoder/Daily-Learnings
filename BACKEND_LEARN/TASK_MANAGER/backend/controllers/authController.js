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

}

// @desc login user
// @route POST/api/auth/login
// @access Public

const loginUser = async (req,res) => {

}

// @desc get user profile
// @route GET/api/auth/profile
// @access Private ( requires JWT)

const getUserProfile = async () => {

}

// @desc update user profile
// @route PUT/api/auth/profile
// @access Private ( requires JWT)

const updateUserProfile = async (req, res) => {

}

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile}