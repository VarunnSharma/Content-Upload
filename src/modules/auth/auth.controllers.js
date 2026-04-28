const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User already exist! Please login' });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                role,
            });
            res.status(201).json({ message: 'User registered successfully', success: true, newUser });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: "Please register! User not found." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET
    );

    res.json({ user, token });
};