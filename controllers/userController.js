const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const getUser = async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found.."
            })
        }
        user.password=undefined;
        return res.status(200).json({
            success:true,
            message:"User get successfully..",
            user
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Error in GET user",
            e
        })
    }
}

//update user
const updateUser = async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found.."
            })
        }
        //update
        const {username,phone,address} = req.body;
        if(username) user.username=username;
        if(phone) user.phone = phone;
        if(address) user.address = address;
        await user.save();
        user.password=undefined;
        return res.status(200).json({
            success:true,
            message:"User updated successfully..",
            user
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Error in updating user",
            e
        })
    }
}

//update Password
const updatePassword = async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found.."
            })
        }
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(500).json({
                success:false,
                message:"Please provide old or new password."
            })
        }
        const isMatch = await bcryptjs.compare(oldPassword,user.password);
        if(!isMatch){
            res.status(500).json({
                success:false,
                message:"Invalid Old Password"
            })
        }
        if(oldPassword === newPassword){res.status(500).json({
            success:false,
            message:"Both passwords can not be same.."
        })}
        var salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(newPassword,salt);
        user.password=hashedPassword;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Password Updated."
        })

    }catch(e){
        res.status(500).json({
            success:false,
            message:"Error in updating password",
        })
    }
}

//delete user
const deleteUser = async(req,res)=>{
    try{
       const deletedUser = await userModel.findByIdAndDelete(req.params.id);
       res.status(200).json({
        success:true,
        message:"User Deleted Successfully..",
        deletedUser
       })    
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Error in deleting user"
        })
    }
}

module.exports = {getUser, updateUser, updatePassword, deleteUser};