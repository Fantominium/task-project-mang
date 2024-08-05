// controllers/todoController.js

const { mongoGet } = require('../config/mongocongo');
const Todo = require('../models/todoModel');

const createTodo = async (req, res) => {
  try {
    const db = mongoGet();
    const todo = await Todo.createTodo(db, req.body);
    if (todo){
    res.status(200).json(todo);
    } else {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

const getTodos = async (req, res) => {
  try {
    const db = mongoGet();
    const todos = await Todo.getAllTodos(db);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

const getTodoById = async (req, res) => {
  try {
    const db = mongoGet();
    const todo = await Todo.getTodoById(db, req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const db = mongoGet();
    const updated = await Todo.updateTodo(db, req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const db = mongoGet();
    const deleted = await Todo.deleteTodo(db, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

// Search Todos by Name
const searchTodos = async (req, res) => {
  try {
    const db = mongoGet();

    // Convert query parameter to a string and trim any whitespace
    const searchQuery = String(req.query.name || '').trim();

    // Validate
    if (!searchQuery || searchQuery.length === 0) {
      return res.status(400).json({ error: 'Search query parameter "name" is required and must not be empty.' });
    }

    const todos = await db.collection(Todo.collection).find({
      todoName: { $regex: searchQuery, $options: 'i' }
    }).toArray();

    res.status(200).json(todos);
  } catch (error) {
    console.error('Error during todo search:', error); // Debug log
    res.status(500).json({ error: 'Failed to search todos', details: error.message });
  }
};

//Sort Todos by Due Date
const sortTodosByDueDate = async (req, res) => {
  try {
    const db = mongoGet();
    const todos = await Todo.sortTodosByDueDate(db);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sort todos by due date' });
  }
};

//Sort Todos by Create Date
const sortTodosByCreateDate = async (req, res) => {
  try {
    const db = mongoGet();
    const todos = await Todo.sortTodosByCreateDate(db);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sort todos by create date' });
  }
};

//Sort Todos by Completed Date
const sortTodosByCompletedDate = async (req, res) => {
  try {
    const db = mongoGet();
    const todos = await Todo.sortTodosByCompletedDate(db);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sort todos by completed date' });
  }
};


module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  searchTodos,
  sortTodosByDueDate,
  sortTodosByCreateDate,
  sortTodosByCompletedDate,
};
