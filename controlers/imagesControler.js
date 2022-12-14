const Images = require("../models/imagesModel.js");
const Errorhandler = require("../utils/errorhandler.js");
const catchAsyncError = require("../middleWare/catchAsyncError.js");
const cloudinery = require("cloudinary")

exports.createImage = catchAsyncError(async (req, res, next) => {
  const { name, category } = req.body;

  const myCloud = await cloudinery.v2.uploader.upload( req.body.img, {
    folder: "imageWorld",
  } );
  

  console.log("image", name, category);

  const image = await Images.create({
    name,
    category,
    downloadCount: 0,
    likeCount: 0,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Images Upload successfully",
    image,
  });
});

exports.getAllImages = catchAsyncError(async (req, res, next) => {
  const images = await Images.find();

  if (!images) {
    next(new Errorhandler("Images not Found", 403));
  }

  res.status(201).json({
    success: true,
    images,
  });
});

exports.getCategoryImages = catchAsyncError(async (req, res, next) => {
  const { value } = req.query;
  //  console.log(value)
  let images = [];

  if (value != undefined) {
    images = await Images.find({ category: value });
  }

  if (!images) {
    next(new Errorhandler("Images not Found", 403));
  }

  res.status(201).json({
    success: true,
    images,
  });
});

exports.getFilterImages = catchAsyncError(async (req, res, next) => {
  const { category } = req.query;
  const { keyword } = req.query;
  // console.log(category, keyword)
  let images,
    allImages = [];
  if (category === undefined && keyword === undefined) {
    images = await Images.find();
  }
  if (keyword) {
    images = await Images.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });
    images.forEach((item) => {
      allImages.push(item);
    });
    images = await Images.find({
      category: {
        $regex: keyword,
        $options: "i",
      },
    });
    images.forEach((item) => {
      allImages.push(item);
    });
  }

  if (!allImages) {
    next(new Errorhandler("Images not Found", 403));
  }

  res.status(201).json({
    success: true,
    allImages,
  });
});

exports.updateImage = catchAsyncError(async (req, res, next) => {
    const {type} = req.body;
  let img = await Images.findById(req.params.id);

  if (!img) {
    next(new Errorhandler("Images not Found", 403));
  }

  if(type==="like"){

      img.likeCount = img.likeCount + 1;
  }
  else if(type==="download"){
    img.downloadCount +=1;
  }
  await img.save();

  console.log(type);

  res.status(201).json({
    success: true,
    message: "update successfully",
  });
});
