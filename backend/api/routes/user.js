const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');
require("dotenv").config();

router.post("/signup", userController.sign_up);

router.post("/login", userController.login);

router.delete("/:userId", userController.delete_user);

module.exports = router;
