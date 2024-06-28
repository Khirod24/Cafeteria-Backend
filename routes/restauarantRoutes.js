const express = require("express");
const authUser = require("../middlewares/authUser");
const { createRestaurant, getAllRestaurants, getRestaurantById, deleteRestaurant } = require("../controllers/restaurantController");
const router = express.Router();

//CREATE RESTAURANT
router.post("/restaurant",authUser,createRestaurant);
//GET ALL RESTAURANTS
router.get("/restaurant",authUser,getAllRestaurants);
//GET RESTAURANT BY ID
router.get("/restaurant/:id",authUser,getRestaurantById);
//DELETE RESTAURANT
router.delete("/restaurant",authUser,deleteRestaurant);