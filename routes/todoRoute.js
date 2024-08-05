// routes/todoRoutes.js

const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

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

// Search Todo
router.get('/search', todoController.searchTodos);

module.exports = router;
