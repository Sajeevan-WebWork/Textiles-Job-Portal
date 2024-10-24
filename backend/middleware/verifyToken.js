import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // No need for explicit check, jwt.verify throws on failure
        if(!decoded) return res.status(401).json({success: false, message: "Unauthorized - invalid token"})
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
