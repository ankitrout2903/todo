import mongoose from "mongoose";

// Define a schema for the user model
const userSchema = new mongoose.Schema({
    // Name of the user, which is required
    name: { type: String, required: true },

    // Email of the user, which is required and must be unique
    email: { type: String, required: true, unique: true },

    // Password of the user, which is required
    password: { type: String, required: true },

    // Reset token for password recovery, which is optional
    resetToken: { type: String, required: false },
});

// Create a model from the schema
const userModel = mongoose.model("User", userSchema);

// Export the model so it can be used in other parts of the application
export default userModel;
