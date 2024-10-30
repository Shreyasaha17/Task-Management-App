const express=require("express")
const userRoute=express.Router()

const UserController=require("../Controller/UserController")
const TaskController=require("../Controller/TaskController")
const AuthenticatedUser=require("../Middleware/auth")

userRoute.post("/register",UserController.userRegister)
userRoute.post("/login",UserController.userLogin)
userRoute.post("/tasks",AuthenticatedUser,TaskController.addTask)
userRoute.get("/tasks",AuthenticatedUser,TaskController.getAllTasks)
userRoute.put("/tasks/:id",AuthenticatedUser,TaskController.updateTask)
userRoute.delete("/tasks/:id",AuthenticatedUser,TaskController.deleteTask)





module.exports=userRoute;