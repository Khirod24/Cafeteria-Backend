const JWT = require("jsonwebtoken");

module.exports = async(req,res,next)=>{
    try{
        const token = req.headers["authorization"].split(" ")[1];
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).json({
                    success:false,
                    message:"Un-Authorized User"
                })
            }else{
                req.body.id= decode.id;
                next();
            }
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Please provide Auth Token"
        })
    }
}