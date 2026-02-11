const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "pending" },
  userId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Task", TaskSchema);
