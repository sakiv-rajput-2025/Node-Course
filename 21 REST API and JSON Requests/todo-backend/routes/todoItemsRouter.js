const express = require('express');
const todoItemsRouter = express.Router();

const todoItemsController = require('../controller/todoItemsController');

todoItemsRouter.get('/', todoItemsController.getTodoItems);
todoItemsRouter.post('/', todoItemsController.createTodoItem);
todoItemsRouter.delete('/:id', todoItemsController.deleteTodoItem);
todoItemsRouter.put('/:id/completed', todoItemsController.markAsCompleted);


module.exports = todoItemsRouter;