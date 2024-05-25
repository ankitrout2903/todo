import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Function to create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60 // Token expires in 3 days
    });
}

// Function to handle user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create a token and send it with the user info
        const token = createToken(user._id);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to handle user registration
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Validate input fields
        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please enter a strong password" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user and save to the database
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Create a token and send it with the user info
        const token = createToken(user._id);
        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to get user information
const getUser = async (req, res) => {
    const id = req.user.id;
    try {
        // Find the user by ID
        const user = await userModel.find({ _id: id });
        res.status(200).json({ user: user[0] });
    } catch (error) {
        res.status(502).json({ message: error.message });
    }
}

// Exporting the functions
export { loginUser, registerUser, getUser };
