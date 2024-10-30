const express=require("express")
const app=express()
const port=5000
const dotenv=require("dotenv")
const cors = require('cors');

const userRoute=require("./Route/UserRoute")
dotenv.config()


app.use(cors());

require("./Database/database")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api",userRoute)
app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
})