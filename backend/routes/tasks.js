const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   GET ALL TASKS
========================= */
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

/* =========================
   CREATE TASK
========================= */
router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      userId: req.user.id,
    });

    return res.status(201).json(task);

  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    return res.status(500).json({
      message: "Failed to create task",
    });
  }
});

/* =========================
   UPDATE TASK
========================= */
router.put("/:id", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.json(task);

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    return res.status(500).json({
      message: "Failed to update task",
    });
  }
});

/* =========================
   DELETE TASK
========================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    return res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;
