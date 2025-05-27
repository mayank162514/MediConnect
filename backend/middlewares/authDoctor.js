import jwt from 'jsonwebtoken'

// user authentication middleware
const authDoctor = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: 'Not authorized login again' });
        }

        const token = authHeader.split(" ")[1];

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.docId = token_decode.id; // or token_decode.userId depending on what you signed
        next();

    } catch (error) {
        console.log("JWT verification error:", error.message);
        res.status(401).json({ success: false, message: 'Not authorized login again' });
    }
};

export default authDoctor;