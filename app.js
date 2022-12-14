const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const errorMiddleWare = require('./middleWare/error.js');
const path = require('path')

// app.use(express.bodyParser({limit: '50mb'}));
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit: '5mb'}));


const images = require("./routes/imagesRoutes");
const users = require("./routes/userRoutes");

app.use("/api/w2",images);
app.use("/api/w2",users);


app.use(express.static(path.join(__dirname,"./client/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./client/build/index.html"))
})

//errorMiddleWare use 
app.use(errorMiddleWare);


module.exports = app;