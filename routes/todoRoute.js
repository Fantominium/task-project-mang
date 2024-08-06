// routes/todoRoutes.js

const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// Search Todo - 
router.get('/search', todoController.searchTodos);

// Create -
router.post('/', todoController.createTodo);

// Get Todos -
router.get('/', todoController.getTodos);

// Get Todo by ID - 
router.get('/:id', todoController.getTodoById);

// Update Todo -
router.put('/:id', todoController.updateTodo);

// Delete Todo -
router.delete('/:id', todoController.deleteTodo);

//Sort by Due Date -
router.get('/sort/due-date', todoController.sortTodosByDueDate);

//Sort by Create Date - 
router.get('/sort/create-date', todoController.sortTodosByCreateDate);

//Sort by Completed Date - 
router.get('/sort/completed-date', todoController.sortTodosByCompletedDate);

//Toggle Completed State - 
router.patch('/:id/toggle-completed', todoController.toggleTodoCompleted);

//Assign to project - 
router.post('/assign', todoController.assignTodoToProject);

module.exports = router;
