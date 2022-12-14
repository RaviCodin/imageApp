const app = require("./app.js")
const dotenv = require('dotenv');
const cloudinary = require("cloudinary");
const createDBConnection = require("./config/database.js");


    dotenv.config({path:"config/config.env"});



createDBConnection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})