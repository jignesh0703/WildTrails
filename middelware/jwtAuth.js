import jwt from 'jsonwebtoken';

const jwtAuth = async (req, res, next) => {
    try {
        // Get token from cookies (web) OR from Authorization header (mobile / API clients)
        // Format expected for header: Authorization: Bearer <token>
        const authHeader = req.cookies?.token || req.headers.authorization;
        const tokenFromHeader = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        const token = req.cookies?.token || tokenFromHeader;

        // If no token found → user is unauthorized
        if (!token) {
            return res.status(401)
                .json({
                    success: false,
                    message: "Authentication required. Token missing."
                });
        }

        // Verify token
        const decord = await jwt.verify(token, process.env.JWT_TOKEN);

        // ⚠️ If verification fails
        if (!decord) {
            return res.status(401)
                .json({
                    success: false,
                    message: "Invalid or expired token."
                })
        }

        // Attach user info to request object
        req.user = {
            id: decord._id,
            role: decord.role
        }
        next();

    } catch (error) {
        // Token expired / wrong signature / malformed token
        return res.status(400)
            .json({
                success: false,
                message: 'Login is required!'
            });
    }
}

export default jwtAuth