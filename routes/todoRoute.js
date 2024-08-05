// routes/todoRoutes.js

const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// Search Todo
router.get('/search', todoController.searchTodos);

// Create
router.post('/', todoController.createTodo);

// Get Todos
router.get('/', todoController.getTodos);

// Get Todo by ID
router.get('/:id', todoController.getTodoById);

// Update Todo
router.put('/:id', todoController.updateTodo);

// Delete Todo
router.delete('/:id', todoController.deleteTodo);

//Sort Todos by Due Date
router.get('/sort/due-date', todoController.sortTodosByDueDate);

//Sort Todos by Create Date
router.get('/sort/create-date', todoController.sortTodosByCreateDate);

//Sort Todos by Completed Date
router.get('/sort/completed-date', todoController.sortTodosByCompletedDate);

// New Route: Toggle Todo Completed State
router.patch('/:id/toggle-completed', todoController.toggleTodoCompleted);

module.exports = router;
