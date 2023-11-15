const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'yourSecretKey'; // Replace with a strong secret key for signing and verifying tokens

// Middleware for token validation
function validateToken(req, res, next) {
    const token = req.header('x-auth-token'); // Assuming the token is included in the 'x-auth-token' header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Move on to the next middleware or route handler
}

// Example route that requires token validation
app.get('/protected-route', validateToken, (req, res) => {
    // Access the decoded user information from the request object
    res.json({ message: 'You have access to this protected route.', user: req.user });
});

// Example route for generating a token (for testing purposes)
app.get('/generate-token', (req, res) => {
    const user = { id: 1, username: 'example_user' };
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});