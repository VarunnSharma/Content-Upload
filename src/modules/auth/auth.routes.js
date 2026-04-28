const router = require("express").Router();
const authController = require("./auth.controllers");
const validator = require('../../middlewares/validator');


router.post('/login', validator.loginValidation, authController.login);
router.post('/register', validator.signupValidation, authController.registerUser);


module.exports = router;