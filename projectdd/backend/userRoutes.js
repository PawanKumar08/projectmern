const express = require('express');
const { registerUser, loginUser, getAllUser } = require('./userController');
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").get(getAllUser);



module.exports = router;