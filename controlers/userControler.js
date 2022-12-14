const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleWare/catchAsyncError.js");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");

//registation user
exports.registationUser = catchAsyncError(async (req, resp, next) => {

    const { name, email, password  } = req.body;
    // console.log("0k ")
      const user = await User.create({
        name,
        email,
        password,
        avtar: {
          public_id: "my id",
          url:"hello.jpg",
        },
      });
  
    sendToken(user, 201, resp);
  });

  exports.login =  catchAsyncError(async (req, resp, next)=>{

    const { email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Plese Enter Email or Password",404))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",404))

    }

    const isPasswordMatched= await user.camparePassword(password);

    // console.log(isPasswordMatched)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",404))
    }

  sendToken(user, 200, resp);

  })


  exports.logOut = catchAsyncError((req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(
            Date.now()
        ),
        httpOnly:true
    })
    

    res.status(200).json({
        success:true,
        message:"Logout successfully"
    })

  })