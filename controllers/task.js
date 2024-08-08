import { Task } from "../model/task.js";

export async function createTask(req, res) {
  try {
    const body = req.body;
    const result = await Task.create({
      title: body.title,
      status: body.status,
      dueDate: body.dueDate,
      email: req.user.email,
    });
    return res.status(201).json({ msg: "task has been created" });
  } catch (error) {
    console.log(error);

    return res.status(401).json({ msg: "bad request", error });
  }
}

export async function getAllTask(req, res) {
  try {
    const email = req.user.email;
    console.log(req.user.email);
    if (!email) {
      return res.status(400).json({ error: "user not found" });
    }
    const data = await Task.find({
      email,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log("error in find the Task for this particular user", error);
    return res.status(400).json({ error: "Error fetching tasks" });
  }
}

export async function deleteTask(req, res) {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(400).json({ status: error });
  }
}

export async function editTask(req, res) {
  try {
    const update = await Task.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
    });
    res.status(200).json(update);
  } catch (error) {
    return res.status(400).json({ status: error });
  }
}

export async function editStatus(req, res) {
  try {
    console.log(req.body.status);

    const update = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    return res.status(200).json(update);
  } catch (error) {
    return res.status(400).json({ status: error });
  }
}

export async function addTaskComment(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    task.comments.push(req.body.comment);
    await task.save();
    res.status(201).send("Comment added:");
  } catch (error) {
    res.status(400).send("Error adding comment:", error);
  }
}
