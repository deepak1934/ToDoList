const mongoose = require("mongoose");

const conn = async(req , res) =>{
  try {
    await mongoose.connect("mongodb+srv://Deepak:deepak1902@todo-list.sqvcz.mongodb.net/").then(() =>{
        console.log("Connected");
    });
  } catch (error) {
    res.status(400).json({
        message: "not connected",
    });
  }
};
conn();