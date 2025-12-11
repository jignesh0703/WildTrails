import bcrypt from 'bcrypt';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config();

const registration = async (req, res) => {
    try {
        // Registration logic here
        const { username, password, email, number, gender } = req.body;

        // Validate input
        if (!username || !password || !email || !number || !gender) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'All fields are required'
                });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }, { number }] });
        if (existingUser) {
            return res.status(409)
                .json({
                    success: false,
                    message: 'User already exists'
                });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, password: hashedPassword, email, number, gender });
        await newUser.save();

        return res.status(201)
            .json({
                success: true,
                message: 'User registered successfully'
            });

    } catch (error) {
        console.error('Registration Error:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Username and password are required'
                });
        }

        // Find User
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404)
                .json({
                    success: false,
                    message: 'User does not exist!'
                });
        }

        // Check Password
        const checkpass = await bcrypt.compare(password, user.password);
        if (!checkpass) {
            return res.status(401)
                .json({
                    success: false,
                    message: 'Incorect password!'
                });
        }

        // Create token
        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: '7d'
            }
        );

        // Cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };

        res.cookie('token', token, cookieOptions);

        // Find User
        return res.status(200)
            .json({
                success: true,
                message: 'Login successful',
                data: {
                    token
                }
            });

    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

const fetchUserData = async (req, res) => {
    try {
        // req.user is coming from jwtAuth middleware
        const user = req.user;

        // If no user is attached, token verification failed
        if (!user) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Login is required!'
                });
        }

        // Find user and hide sensitive fields
        const findUser = await User.findById(user.id)
            .select('-updatedAt -createdAt -password -__v');

        if (!findUser) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'User dont found!'
                });
        }

        // Success response
        return res.status(200)
            .json({
                success: true,
                message: 'User data fetch Succesfully!',
                data: {
                    user: findUser
                }
            });

    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

export {
    registration,
    login,
    fetchUserData
}