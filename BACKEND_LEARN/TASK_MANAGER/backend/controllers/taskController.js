// const Task = require("../models/Task");
const TaskModel = require("../models/Task");

// @desc Get all tasks (Admin: all, User: only assigned tasks)
// @router GET/api/tasks
// @access private

const getTasks = async (req, res) => {
    try{
        const {status} = req.query;
        let filter = {};

        if(status){
            filter.status = status;
        }

        let tasks;

        if(req.user.role == "admin"){
            tasks = await TaskModel.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            )
        }else{
            tasks = await tasks.find({...filter, assignedTo:req.user._id}).populate(
                "assignedTo",
                "name email profileImageUrl")
        }

        // Add completed todoChecklist count to each task
        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoCheckList.filter(
                    (item) => item.completed
                ).length;
                return{...task._doc, completedTodoCount : completedCount}
            })
        )

        //Status summary counts 
        const allTasks = await TaskModel.countDocuments(
            req.user.role === "admin" ? {} :{ assignedTo: req.user._id}
        );

        const pendingTasks = await TaskModel.countDocuments({
            ...filter,
            status:"Pending",
            ...(req.user.role !== "admin" &&  {assignedTo : req.user._id})
        })

        const inProgressTasks = await TaskModel.countDocuments({
            ...filter,
            status:"In Progress",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id })
        });


        const completedTasks = await TaskModel.countDocuments({
            ...filter,
            status:"Completed",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id })
        });

        res.json({
            tasks,
            statusSummary:{
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks
            }
        });




    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc Get task by ID
// @router GET/api/tasks/:id
// @access private

const getTaskById = async (req, res) => {
    try{

        const task = await TaskModel.findById(req.params.id).populate("assignedTo","name email profileImageUrl");

        if(!task){return res.status(404).json({message:"Task not found"})};

        res.json(task)

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc create a new task
// @router POST/api/tasks
// @access private (Admin only)

const createTask = async (req, res) => {

    try{

        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments, 
            todoCheckList, 
        } = req.body

        if(!Array.isArray(assignedTo)){
            return res.status(400).json({message:"assignedTo must be an array of user IDs"})
        }

        const task = await TaskModel.create({
            title, description, priority, dueDate, assignedTo, createdBy: req.user._id, attachments, todoCheckList
        });
        
        res.status(201).json({message:"Task created successfully", task})

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc update task details
// @router PUT/api/tasks/:id
// @access private

const updateTask = async (req, res) => {
    try{

        const task = await TaskModel.findById(req.params.id);

        if(!task) return res.status(404).json({message:"User not found"})

        task.title = req.body.title || task.title,
        task.description = req.body.description || task.description,
        task.priority = req.body.priority || task.priority
        task.dueDate = req.body.dueDate || task.dueDate 
        task.assignedTo = req.body.assignedTo || task.assignedTo
        task.attachments = req.body.attachments || task.attachments
        task.todoCheckList =req.body.todoCheckList || task.todoCheckList

        if(req.body.assignedTo){
            if(!Array.isArray(req.body.assignedTo)){
                return res.status(400).json({message:"assignedTo must be an array of user IDs"})
            }
            task.assignedTo = req.body.assignedTo;
        }

        const updatedTask = await task.save();
        res.json({message:"Task updated successfully",updateTask})

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}


// @desc Delete a task (Admin only)
// @router DELETE/api/tasks/:id
// @access private(Admin)

const deleteTask = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc update task status
// @router PUT/api/task/:id/status
// @access Private

const updateTaskStatus = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc Update task checklist
// @router PUT/api/task/:id/todo
// @access Private

const updateTaskChecklist = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc Dashboard Data (Admin only)
// @router GET/api/tasks/dashboard-data
// @access Private

const getDashboardData = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc Dashboard Data (user-sspecific)
// @router GET/api/tasks/user-dashboard-data
// @access Private

const getUserDashboardData = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

module.exports = {
    getTaskById,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData
};