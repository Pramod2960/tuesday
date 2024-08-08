import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  editTask,
  addTaskComment,
  editStatus,
} from "../controllers/task.js";

const router = express.Router();

//task creation
router.get("/task", getAllTask);
router.post("/task", createTask);
router.delete("/task/:id", deleteTask);

router.patch("/task/:id", editTask);
router.patch("/task/status/:id", editStatus);

//Task Manipulation
router.post("/task/comment/:id", addTaskComment);

export default router;
