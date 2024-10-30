const User=require("../Model/UserSchema")
const bcrypt=require("bcrypt")
const jwt_token=require("jsonwebtoken")

class UserController{
    static userRegister=async(req,res)=>{
        const {email,name,password}=req.body
        const salt=bcrypt.genSaltSync(10)
        const hashPassword=bcrypt.hashSync(password,salt)

        const existUser=await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already Registered"})
        }
        else{
            let register=new User({name,email,password:hashPassword})
            register=await register.save()
            return res.status(201).json({message:"User is succesfully registered",ok: true})
        }
    }

    static userLogin=async(req,res)=>{
        const {email,password}=req.body
        const existUser=await User.findOne({email})
        if(!existUser){
            return res.status(401).json({message:"User is not registered before!!"})
        }
        const matchPassword=bcrypt.compareSync(password,existUser.password)
        if(!matchPassword){
            return res.status(401).json({message:"Password is incorrect!!"})
        }
        else{
            const token=jwt_token.sign({id:existUser._id},process.env.SECRET_KEY,{expiresIn:'1d'})
            return res.status(200).json({name:`${existUser.name},u are succesfully Logged in !!`,token,id:existUser._id})
        }

    }
}
module.exports=UserController