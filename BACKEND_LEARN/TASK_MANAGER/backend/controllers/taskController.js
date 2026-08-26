// const Task = require("../models/Task");
const Task = require("../models/Task");
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

        const task = await TaskModel.findById(req.params.id);

        if(!task) return res.status(404).json({message:"Task not found"});

        await task.deleteOne();

        res.json({message:"Task deleted succeessfully"});

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc update task status
// @router PUT/api/task/:id/status
// @access Private

const updateTaskStatus = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({message:"Task not found"});

        const isAssigned = task.assignedTo.some(
            (userId) => userId.toString() === req.user._id.toString()
        );

        if(!isAssigned && req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized"});
        }

        task.status= req.body.status || task.status;

        if(task.status === "Completed"){
            task.todoCheckList.forEach( (item) => (item.completed = true));
            task.progress = 100;
        }

        await task.save();

        res.json({ message:"task status updted", task })

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc Update task checklist
// @router PUT/api/task/:id/todo
// @access Private

const updateTaskChecklist = async (req, res) => {

    try{

        const { todoCheckList } = req.body;
        
        const task = await TaskModel.findById(req.params.id);

        if(!task) return res.status(404).json({message:"Task not found"})

        // const isAssigned = task.assignedTo.some((userID) => userID.toString() === (req.user._id).toString())   

        if( !task.assignedTo.includes(req.user._id) && req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized to update checklist"})
        }

        task.todoCheckList = todoCheckList;

        // Auto update progresss based on checklist completion

        const completedCount = task.todoCheckList.filter((item) => item.completed).length;
        const totalItems = task.todoCheckList.length;

        task.progress = totalItems > 0  ? Math.round((completedCount/totalItems) * 100) : 0;

        //Auto-mark as completed if all items are checked
        if(task.progress === 100){
            task.status = "Completed";
        }else if(task.progress > 0){
            task.status = "In Progress"
        }else{
            task.status = "Pending";
        }

        await task.save();

        const updatedTask = await TaskModel.findById(req.params.id).populate("assignedTo","name email profileImageurl");

        res.json({message:"task checklist updated", task: updatedTask})



    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc Dashboard Data (Admin only)
// @router GET/api/tasks/dashboard-data
// @access Private

const getDashboardData = async (req, res) => {
    try{
        const totalTasks = await TaskModel.countDocuments();
        const pendingTasks = await TaskModel.countDocuments({status:"Pending"});
        const completedTasks = await TaskModel.countDocuments({status:"Completed"});
        const overdueTasks = await TaskModel.countDocuments({
            status:{$ne:"Completed"},
            dueDate:{$lt: new Date()}
        })

        // Ensure all possible statuses are included
        const taskStatuses = ["Pending", "In Progress", "Completed"];
        const taskDistributionRaw = await TaskModel.aggregate([
            {
                $group:{
                    _id:"$status",
                    count:{$sum : 1}
                }
            }
        ]);
        console.log(taskDistributionRaw);
        const taskDistribution = taskStatuses.reduce((acc, status) => {
            const formattedKey = status.replace(/\s+/g, "");
            acc[formattedKey] = taskDistributionRaw.find((item) => item._id === status)?.count || 0;
            return acc;
        },{});

        taskDistribution["All"] = totalTasks;

        // Ensure all priority levels are included
        const taskPriorities = ["Low", "Medium","High"];
        const TaskPriorityLevelRaw = await TaskModel.aggregate([
            {$group:{_id:"$priority",count:{$sum:1}}}
        ]);
        const taskPriorityLevels = taskPriorities.reduce((acc, priority) =>{
            acc[priority] = TaskPriorityLevelRaw.find((item) => item._id === priority)?.count || 0;
            return acc;
        },{});

        const recentTasks = TaskModel.sort({createdAt : -1}).limit(10).select("title status priority dueDate createdAt");
        res.status(200).json({
            statistics:{
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks
            },
            charts:{
                taskDistribution,
                taskPriorityLevels
            },
            recentTasks
        })

    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}

// @desc Dashboard Data (user-sspecific)
// @router GET/api/tasks/user-dashboard-data
// @access Private

const getUserDashboardData = async (req, res) => {
    try{
        const userId = req.user._id; // Only fetvh data for the logged in user

        //Fetch statistics for user-specific tasks

        const totalTasks = await TaskModel.countDocuments({assignedTo : userId});
        const PendingTasks = await TaskModel.countDocuments({assignedTo : userId, status: "Pending"});
        const completedTasks = await TaskModel.countDocuments({assignedTo : userId, status: "Completed"});
        const overdueTasks = await TaskModel.countDocuments({
            assignedTo : userId, 
            status:{ $ne:"Completed" },
            dueDate:{ $lt: new Date() }
        });

        // Task distribution by stauses
        const taskStatuses = ["Pending", "In Progress", "Completed"];
        const taskDistributionRaw = await TaskModel.aggregate([
            {$match:{assignedTo : userId}},
            {$group:{
                _id:"$status",
                count:{$sum : 1}
            }}
        ]);

        const taskDistribution = taskStatuses.reduce((acc,status) => {
            const  formattedKey = 
        },{})


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