const TaskModel = require("../models/Task");
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc get all users (Admin Only)
// @route GET/api/users/
// @access Private (Admin)

const getUsers = async (req, res) => {
    try{
        const users = await UserModel.find({role:"member"}).select("-password");
        // console.log(users)

        // Add task counts to each user
        const userWithTaskCounts = await Promise.all(users.map(async (user) => {
            // const pendingTasks = await TaskModel.countDocuments({ assignedTo: user._id, status: "Pending"});
            // const inProgressTasks = await TaskModel.countDocuments({ assignedTo: user._id, status: "In Progress"})
            // const  completedTasks = await TaskModel.countDocuments({assignedTo: user._id, status: "Completed"});

            const [pendingTasks, inProgressTasks, completedTasks] = await Promise.all([
                TaskModel.countDocuments({ assignedTo: user._id, status: "Pending"}),
                TaskModel.countDocuments({ assignedTo: user._id, status: "In Progress"}),
                TaskModel.countDocuments({assignedTo: user._id, status: "Completed"})
            ])

            return{
                ...user._doc,
                pendingTasks,
                inProgressTasks,
                completedTasks
            }
        }))

        res.json(userWithTaskCounts);

    }catch(error){
        res.status(500).json({message:"Server error", error: error.mesage})
    }
}

// @desc Get user by ID
// @route GET/api/users/:id
// @access Private

const getUserById = async (req,res) => {
    try{

        const user = await UserModel.findById(req.params.id).select("-password");
        if(!user){
           return res.status(404).json("User not found")
        }
        res.json(user)

    }catch(error){
        res.status(500).json({message:"Server error", error: error.mesage})
    }
}


// @desc Delete a user (Admin only)
// @route DELETE/api/user/:id
// @access Private(Admin)

// const deleteUser = async (req,res) => {
//     try{

//     }catch(error){
//         res.status(500).json({message:"Server error", error: error.mesage})
//     }
// }

module.exports = { getUsers, getUserById };