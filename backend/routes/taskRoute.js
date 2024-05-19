import express from "express"
import { addTask, getTask, removeTask,editTask,sendReminderEmails} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post('/addTask', requireAuth, addTask);
router.get('/getTask/:taskId', requireAuth, getTask); // Assuming you're fetching a specific task by its ID
router.delete('/removeTask/:taskId', requireAuth, removeTask); // Use DELETE method for removing a task
router.put('/editTask/:taskId', requireAuth, editTask); // Use PUT method for editing/updating a task
router.get('/reminder', requireAuth, sendReminderEmails);

export default router;
