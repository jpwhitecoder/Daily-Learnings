import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import Dashboard from './pages/Admin/Dashboard'
import Signup from './pages/Auth/Signup'
import Login from "./pages/Auth/Login"
import CreateTask from './pages/Admin/CreateTask'
import ManageTasks from './pages/Admin/ManageTasks'
import MangeUser from './pages/Admin/MangeUser'
import UserDashboard from './pages/User/UserDashboard'
import MyTasks from './pages/User/MyTasks'
import ViewTaskDetails from './pages/User/ViewTaskDetails'

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        {/* Admin routes */}

        <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/tasks" element={<ManageTasks/>}/>
          <Route path="/admin/create-task" element={<CreateTask/>}/>
          <Route path="/admin/users" element={<MangeUser/>}/>
        </Route> 

        
        {/*User routes */}

        <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
          <Route path="/user/dashboard" element={<UserDashboard/>}/>
          <Route path="/user/tasks" element={<MyTasks/>}/>
          <Route path="/user/task-details" element={<ViewTaskDetails/>}/>
         
        </Route> 

      </Routes>
    </Router>
    
  )
}

export default App