const mongoose = require("mongoose");
const colors = require("colors");

const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`CONNECTED TO DB ${mongoose.connection.host}`.white.bgGreen)
    }catch(e){
        console.log(`DB ERROR`.white.bgRed,e)
    }
}

module.exports = dbConnect;