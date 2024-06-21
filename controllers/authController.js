const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");

const signupController = async(req,res)=>{
    try{
        const {username, email, phone, address, password} = req.body;
        //validatiom
        if(!username || !phone || !address || !email || !password){
            return res.status(500).json({
                success:false,
                message:"Please Provide all Fields"
            })
        }
        //check existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(500).json({
                success:false,
                message:"User already registered, please login",
            })
        }
        //hash pswd
        var salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        //create new user
        const user = await userModel.create({
            username,
            email,
            password:hashedPassword,
            phone,
            address});
        return res.status(200).json({
            sucess:true,
            message:"User registered successfully..",
            user,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in signup API",
            error,
        })
    }
}

const loginController = async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(500).json({
                success:false,
                message:"Provide Email or Password properly",
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found, Try Again"
            })
        }
        //compare password
        const isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        //token
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '7d'});
        user.password=undefined;
        res.status(200).json({
            success:true,
            message:"User Login Successfully..",
            token,
            user,
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            sucess:false,
            message:"Login Error, Try Again."
        })
    }
}

module.exports = {signupController, loginController};