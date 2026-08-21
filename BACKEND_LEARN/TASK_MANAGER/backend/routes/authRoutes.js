const express = require("express");

const router = express.Router;

router.post("/register", registerUser)

router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);// Get user profile

router.put("/profile", protect, updateUserProfile); // update user profile

module.exports = router;