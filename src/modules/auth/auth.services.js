const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized user! JWT required' });
        }
        else {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' });
                }
                req.user = user;
                next();
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = authenticateUser;