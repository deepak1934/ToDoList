const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures no duplicate emails
  },
  username: {
    type: String,
    required: true,  // Ensures every user has a username
  },
  password: {
    type: String,
    required: true,
  },
  list: [{
    type: mongoose.Types.ObjectId,
    ref: "List",
  }],
}, { timestamps: true });  // Adds createdAt and updatedAt

module.exports = mongoose.model("User", userschema);
