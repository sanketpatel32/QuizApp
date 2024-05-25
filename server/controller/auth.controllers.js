import bcrypt from 'bcrypt';
import users from '../models/userModel.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

// --------------------------------------------REGISTER-------------------------------------------------
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await users.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create a new user object
        const newUser = new users({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save the user in the database
        await newUser.save();

        // Generate JWT token and set cookie
        generateTokenAndSetCookie(newUser._id, res);

        // Send success response with user information
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: `${error.message}` });
    }
};

// --------------------------------------------------------LOGIN--------------------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by username
        const user = await users.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        
        // Check if user exists and password is correct
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        
        // Generate JWT token and set cookie
        generateTokenAndSetCookie(user._id, res);

        // Send success response with user information
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error })
    }
};

//-----------------------------------------LOGOUT--------------------------------
export const logout = (req, res) => {
    try {
        // Clear JWT token cookie
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        // Handle errors
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

