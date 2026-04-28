const joi = require('joi');

const signupValidation = (req, res, next) => {
    try {
        const userSchema = joi.object({
            name: joi.string().required().min(3).max(50),
            email: joi.string().email().required(),
            password: joi.string().min(4).required(),
            role: joi.string()
        });
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    } catch (error) {
        console.error("Signup Validation error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginValidation = (req, res, next) => {
    try {
        const userSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(4).required()
        });
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    } catch (error) {
        console.error("Login Validation error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { signupValidation, loginValidation }; 