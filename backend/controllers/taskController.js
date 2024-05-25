import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Function to send email notifications
const sendMail = (email, subject, title, description, dueDate) => {
  var transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "ankitrout2903@gmail.com",
    to: email,
    subject: subject,
    html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3><h3>Due: ${dueDate}</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Function to send reminder emails for overdue tasks
const sendReminderEmails = async () => {
  try {
    // Find tasks where dueDate is less than the current date and are not completed
    const overdueTasks = await taskModel.find({
      dueDate: { $lt: new Date() },
      completed: false
    }).populate('userId');

    // Send email for each overdue task
    overdueTasks.forEach(async (task) => {
      await sendMail(task.userId.email, "Task Overdue", task.title, task.description, task.dueDate);
    });
  } catch (error) {
    console.error("Error sending reminder emails:", error);
  }
};

// Function to add a new task
const addTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.id;

    // Validate the input
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!dueDate) {
      return res.status(400).json({ message: "Due date is required" });
    }

    // Ensure dueDate is parsed to a Date object
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate)) {
      return res.status(400).json({ message: "Invalid due date" });
    }

    // Fetch the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new task
    const newTask = new taskModel({
      title,
      description,
      completed: false,
      userId,
      dueDate: parsedDueDate,
    });

    // Save the new task
    await newTask.save();

    // Format dueDate for email
    const formattedDueDate = parsedDueDate.toDateString();
    sendMail(user.email, "Task Added", title, description, formattedDueDate);

    return res.status(200).json({ message: "Task added successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to remove a task
const removeTask = (req, res) => {
  const { id } = req.body;
  console.log("id: ", id);
  taskModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Task deleted successfully" }))
    .catch((error) => res.status(501).json({ message: error.message }));
};

// Function to get all tasks for the logged-in user
const getTask = (req, res) => {
  taskModel
    .find({ userId: req.user.id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(501).json({ message: error.message }));
};

// Function to edit a task
const editTask = (req, res) => {
  const { id, title, description, completed, dueDate } = req.body;
  taskModel
    .findByIdAndUpdate(id, { title, description, completed, dueDate }, { new: true })
    .then((updatedTask) => res.status(200).json(updatedTask))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Exporting the functions
export { addTask, getTask, removeTask, editTask, sendReminderEmails };
