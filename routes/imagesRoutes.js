const express = require("express");
const { createImage, updateImage, getAllImages, getFilterImages, getCategoryImages } = require("../controlers/imagesControler");
const {isAuthenticated, authRole} = require("../middleWare/auth");

const router = express.Router();

router.route("/create").post(createImage)
router.route("/update/:id").put(updateImage)
router.route("/images").get(getAllImages)
router.route("/category").get(getCategoryImages)
router.route("/filter/images").get(getFilterImages)


module.exports = router;
