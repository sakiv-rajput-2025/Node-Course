const TodoItem = require("../models/TodoItem");

exports.createTodoItem = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { task, date } = req.body;
    const todoItem = new TodoItem({ task, date });
    const savedItem = await todoItem.save();
    console.log("Saved in Mongo:", savedItem);
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Error saving todo:", err);
    res.status(500).json({ error: "Failed to save todo" });
  }
};

exports.getTodoItems = async (req, res, next) => {
  const todoItems = await TodoItem.find();
  res.json(todoItems);
};

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  await TodoItem.findByIdAndDelete(id);
  res.status(204).json({ _id: id });
};

exports.markAsCompleted = async (req, res, next) => {
  const { id } = req.params;
  const todoItem = await TodoItem.findById(id);
  todoItem.completed = true;
  await todoItem.save();
  res.json(todoItem);
};
