import express from 'express'; // Importing express framework
import { loginUser, registerUser, getUser } from '../controllers/userController.js'; // Importing controller functions for user management
import requireAuth from '../middleware/requireAuth.js'; // Importing authentication middleware

const router = express.Router(); // Creating a new router instance

// Define routes for user authentication and management

// Route for user login
router.post("/login", loginUser);

// Route for user registration
router.post("/register", registerUser);

// Route for retrieving user information
router.get("/getuser", requireAuth, getUser);

export default router; // Exporting the router to be used in other parts of the application
