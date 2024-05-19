import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendMail = (email, subject, title, description,dueDate) => {
  var transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "ankitrout2903@gmail.com",
    to: "ankitrout2903@gmail.com",
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
const addTask = async (req, res) => {
  const { title, description,dueDate } = req.body;
  const userId = req.user.id;
  const user = await userModel.find({ _id: userId });
  const newTask = new taskModel({
    title,
    description,
    completed: false,
    userId,
    dueDate,
  });
  newTask
    .save()
    .then(() => {
      sendMail(user[0].email, "Task Added", title, description,dueDate);
      return res.status(200).json({ message: "Task added successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};
const removeTask = (req, res) => {
  const { id } = req.body;
  console.log("id: ", id);
  taskModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Task deleted successfully" }))
    .catch((error) => res.status(501).json({ message: error.message }));
};

const getTask = (req, res) => {
  taskModel
    .find({ userId: req.user.id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(501).json({ message: error.message }));
};

const editTask = (req, res) => {
  const { id, title, description, completed,dueDate } = req.body;
  taskModel
    .findByIdAndUpdate(id, { title, description, completed,dueDate }, { new: true })
    .then((updatedTask) => res.status(200).json(updatedTask))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export { addTask, getTask, removeTask, editTask };
