const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dbConnect = require("./config/db");

require("dotenv").config();
dbConnect();

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes");

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1",userRoutes);

app.get('/',(req,res)=>{
    return res.status(200).send("<h3>WELCOME TO FOOD APP</h3>");
})

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`.white.bgBlue);
})