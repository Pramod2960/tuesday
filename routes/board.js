import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  editTask,
  addTaskComment,
} from "../controllers/task.js";

const router = express.Router();

//task creation
router.get("/task", getAllTask);
router.post("/task", createTask);
router.delete("/task/:id", deleteTask);
router.patch("/task/:id", editTask);

//Task Manipulation
router.post("/task/comment/:id", addTaskComment);

export default router;
