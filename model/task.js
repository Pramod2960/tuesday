import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "not-started",
      require: true,
    },
    dueDate: {
      type: Date,
    },
    email: {
      type: String,
      require: true,
    },
    comments: {
      type: [String],
    },
  },
  { timestamps: true }
);
export const Task = mongoose.model("Task", taskSchema);
