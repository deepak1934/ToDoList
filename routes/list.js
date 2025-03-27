const mongoose = require("mongoose");
const router = require("express").Router();
const List = require("../models/list");
const User = require("../models/user");

// Create a new task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const task = new List({ title, body, user: existingUser._id });
    await task.save();

    existingUser.list.push(task._id);
    await existingUser.save();

    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a task
router.put("/updateTask/:id", async (req, res) => {
  try {
   const {title, body} = req.body;

    const list = await List.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
    if (!list) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(
      id,
      { $pull: { list: req.params.id } },
      { new: true }
    );

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = await List.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks
router.get("/getTask/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const tasks = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ task: tasks }); // ✅ Matches frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
