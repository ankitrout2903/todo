import mongoose from "mongoose";

// Define a schema for the task model
const taskInstance = mongoose.Schema({
    // Title of the task, which is required
    title: { type: String, required: true },

    // Description of the task, which is also required
    description: { type: String, required: true },

    // ID of the user who created the task, which is required
    userId: { type: String, required: true },

    // Boolean to indicate if the task is completed, which is required
    completed: { type: Boolean, required: true },

    // Due date of the task, which is optional
    dueDate: { type: Date, required: false }
}, 
{ 
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true 
});

// Create a model from the schema
const taskModel = mongoose.model("Task", taskInstance);

// Export the model so it can be used in other parts of the application
export default taskModel;
