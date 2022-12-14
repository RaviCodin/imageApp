const Errorhandler = require("../utils/errorHandler.js");
const jwt = require('jsonwebtoken');
const catchAsyncError = require("./catchAsyncError.js");
const User = require("../models/userModel.js")

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        next(new Errorhandler("Please login to access this resource", 401));
    }
    // console.log(token);
    const decodedData = jwt.verify(token, process.env.jWT_SECRET)

    req.user =  await User.findById(decodedData.id);
    next();
});

exports.authRole =  (...roles) => {
    return (req, res, next)=>{
        // console.log(roles , req.user)
        if(!roles.includes(req.user.role)){
            return next(
                new Errorhandler(`Role : ${req.user.role} is not allowed to access the resource`,403)
            )
        }
    }
    next();
   
};

// authRole("admin");