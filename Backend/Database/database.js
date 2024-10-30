const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/TaskMangementApp")
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch((error)=>{
    console.log(error)
})