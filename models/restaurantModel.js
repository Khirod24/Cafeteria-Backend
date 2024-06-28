const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    imageUrl:{type:String},
    code:{type:String},
    time:{type:String},
    logoUrl:{type:String},
    foods:{type:Array},
    pickup:{
        type:Boolean,
        default:true,
    },
    delivery:{
        type:Boolean,
        default:true,
    },
    isOpen:{
        type:Boolean,
        default:true,
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5,
    },
    ratingCount:{
        type:String
    },
    coords: {
        id: { type: String },
        latitude: { type: Number },
        latitudeDelta: { type: Number },
        longitude: { type: Number },
        longitudeDelta: { type: Number },
        address: { type: String },
        title: { type: String },
      },
},{timestamps:true});

module.exports = mongoose.model("Restaurant", restaurantSchema);