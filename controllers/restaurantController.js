const Restaurant = require("../models/restaurantModel");

const createRestaurant = async(req,res)=>{
    try {
        const {name,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body;
        if(!name || !coords){
            res.status(500).json({
                success:false,
                message:"Please provide name and address of the restaurant"
            })
        }
        const newRestaurant = await Restaurant.create({
            name,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords
        });
        res.status(201).json({
            success:true,
            message:"New Restaurant Created Successfully",
            newRestaurant,
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Error in creating new restaurant."
        })
    }
}

const getAllRestaurants = async(req,res)=>{
    try{
        const restaurants = await Restaurant.find({});
        if(!restaurants){
          return res.status(404).json({
            success:false,
            message:"No Restaurant Available.."
        })
    }
    return res.status(201).json({
        success:true,
        totalCount:restaurants.length,
        restaurants,
    })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Error in get all restaurants..",e
        })
    } 
}

const getRestaurantById = async(req,res)=>{
    try{
        const id = req.params.id;
        if(!id){
            res.status(404).json({
                success:false,
                message:"Please provide the restaurant ID",
            })
        }
        const restaurant = await Restaurant.findById(id);
        if(!restaurant){
            res.status(404).json({
                success:false,
                message:"No restaurant is found.."
            })
        }
        res.status(200).json({
            success:true,
            restaurant,
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Error in get restaurant by its ID",e
        })
    }
}

const deleteRestaurant = async(req,res)=>{
    try{
        const id = req.params.id;
        if(!id){
            res.status(404).json({
                success:false,
                message:"Please provide restaurant ID"
            })
        }
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            message:"Restaurant deleted successfully..",
            deletedRestaurant,
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Error in deleting restaurant",e    
        })
    }
}

module.exports = {createRestaurant,getAllRestaurants,getRestaurantById,deleteRestaurant};