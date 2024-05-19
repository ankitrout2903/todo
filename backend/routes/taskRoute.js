import express from "express"
import { addTask, getTask, removeTask,editTask,sendReminderEmails} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", requireAuth, addTask)
router.get("/getTask",requireAuth, getTask)
router.get("/removeTask",requireAuth, removeTask)
router.get("/editTask",requireAuth,editTask)
router.get("/reminder",requireAuth,sendReminderEmails)

export default router;
