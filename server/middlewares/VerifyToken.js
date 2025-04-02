const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id = decoded.id; // Attach user ID to the request
        next(); // Move to the next middleware or controller
    } catch (error) {
        return res.status(400).json({ success: false, message: "Token verification failed" });
    }
};

module.exports = { verifyToken };
