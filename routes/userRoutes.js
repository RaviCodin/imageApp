const express = require('express');
const { registationUser, login, logOut } = require('../controlers/userControler.js');
const router = express.Router();


router.route("/register").post(registationUser);
router.route("/login").post(login);
router.route("/logout").get(logOut);

module.exports = router;