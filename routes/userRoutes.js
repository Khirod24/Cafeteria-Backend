const express = require("express");
const { getUser, updateUser, updatePassword, deleteUser } = require("../controllers/userController");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.get("/user",authUser,getUser);
router.put("/user",authUser,updateUser);
router.post("/user/updatePassword",authUser,updatePassword);
router.delete("/user/:id",authUser,deleteUser)

module.exports = router;