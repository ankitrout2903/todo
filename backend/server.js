import express from "express"; // Importing express framework
import mongoose from "mongoose"; // Importing mongoose for MongoDB connection
import cors from "cors"; // Importing cors middleware for handling cross-origin requests
import dotenv from "dotenv"; // Importing dotenv for environment variables

import userRouter from "./routes/userRoute.js"; // Importing user routes
import taskRouter from "./routes/taskRoute.js"; // Importing task routes
import forgotPasswordRouter from "./routes/forgotPassword.js"; // Importing forgot password routes

// App Configuration
dotenv.config(); // Loading environment variables from .env file
const app = express(); // Creating an instance of express application
const port = process.env.PORT || 8001; // Setting the port to listen on, using environment variable or default to 8001
mongoose.set('strictQuery', true); // Setting mongoose option to enforce strict query behavior

// Middleware Configuration
app.use(express.json()); // Parsing incoming JSON requests
app.use(cors({ origin: "*" })); // Allowing requests from all origins

// Database Configuration
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err); // Logging any errors that occur during MongoDB connection
    } else {
        console.log("DB Connected"); // Logging successful database connection
    }
});

// API Endpoints

// Root endpoint
app.get("/", (req, res) => {
    res.status(200).send("server connect"); // Sending a simple response to indicate server connection
});

// Mounting user routes
app.use("/api/user", userRouter);

// Mounting task routes
app.use("/api/task", taskRouter);

// Mounting forgot password routes
app.use("/api/forgotPassword", forgotPasswordRouter);

// Server Listening
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on localhost:${port}`)); // Starting the server and listening on specified port
}

export default app; // Exporting the express application instance
