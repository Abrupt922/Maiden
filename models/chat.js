
const mongoose = require("mongoose");

// Define the schema
const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    required: true 
  }
});

// Create the model
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
