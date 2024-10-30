const jwt_token=require("jsonwebtoken")


const AuthenticatedUser=async(req,res,next)=>{
    const{authorization}=req.headers
    if(!authorization){
        return res.send(401).json({message:"Authorization is not presesnt in headers"})
    }
    const token=authorization.split(" ")[1]
    try {
        const decode=jwt_token.verify(token,process.env.SECRET_KEY)
    const{id}=decode
    req.user_id=id
    next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
module.exports=AuthenticatedUser;