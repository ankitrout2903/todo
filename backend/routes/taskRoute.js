import express from "express"; // Importing express framework
import { addTask, getTask, removeTask, editTask, sendReminderEmails } from "../controllers/taskController.js"; // Importing controller functions for task management
import requireAuth from "../middleware/requireAuth.js"; // Importing authentication middleware

const router = express.Router(); // Creating a new router instance

// Define routes for task management

// Route for adding a new task
router.post('/addTask', requireAuth, addTask);

// Route for getting a specific task by its ID
router.get('/getTask/:taskId', requireAuth, getTask);

// Route for removing a task by its ID
router.delete('/removeTask/:taskId', requireAuth, removeTask);

// Route for editing/updating a task by its ID
router.put('/editTask/:taskId', requireAuth, editTask);

// Route for sending reminder emails for overdue tasks
router.get('/reminder', requireAuth, sendReminderEmails);

export default router; // Exporting the router to be used in other parts of the application
