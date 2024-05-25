import express from "express"; // Importing express framework
import { forgotPassword, resetPassword } from "../controllers/forgotPasswordController.js"; // Importing the forgotPassword and resetPassword controllers

const router = express.Router(); // Creating a new router instance

// Define a POST route for handling "forgot password" requests
router.post("/forgotPassword", forgotPassword);

// Define a POST route for handling "reset password" requests
router.post("/resetPassword", resetPassword);

export default router; // Exporting the router to be used in other parts of the application
