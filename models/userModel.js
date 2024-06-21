const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required"],
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "password is required"],
    },
    address:{type:Array},
    phone:{
        type:String,
        required:[true,"Phone number is required"]
    },
    userType:{
        type:String,
        required:[true, "User type is required"],
        default:"client",
        enum:["client","admin"]
    },
    profile: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    // answer:{
    //     type:String,
    //     required:[true, "Answer is required"],
    // },
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);