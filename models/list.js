const mongoose = require("mongoose");

const listschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {  // Changed from an array to a single object reference
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,  // Ensures a list must be linked to a user
  },
}, { timestamps: true });

module.exports = mongoose.model("List", listschema);
