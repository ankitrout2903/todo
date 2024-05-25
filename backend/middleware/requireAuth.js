import jwt from 'jsonwebtoken';

// Middleware function to check if the user is authenticated
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    // Check if the authorization header is provided
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from the authorization header
    const token = authorization.split(' ')[1] + "";

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Attach the token to the request object
        req.token = token;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return a 500 error response
        return res.status(500).json({ message: error.message });
    }
}

export default requireAuth;
