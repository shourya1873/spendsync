const express = require('express');
const { body, validationResult } = require('express-validator');
const {createUser, loginUser, getUser} = require('@/models/user.model')
const router = express.Router();
const auth = require('@/middleware/auth');

// Register route with validation
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('name').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    // Handle validation errors and proceed with registration logic
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await createUser(req.body);        
    } catch (error) {
        return res.status(200).json({ message: error.message });        
    }
    
    return res.status(200).json({ message: 'User registered successfully!' });
});

// Login route with validation
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    // Handle validation errors and proceed with registration logic
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const token = await loginUser(req.body);
        return res.status(200).json({ message: 'User Logged in successfully!', token });        
    } catch (error) {
        return res.status(200).json({ message: error.message });        
    }
    
});

// get user details
router.get('/details', auth, async (req, res) => {
    const user = await getUser(req.query.email);
    return res.status(200).json({ message: 'User details fetched successfully!', user });
});


module.exports = router;
