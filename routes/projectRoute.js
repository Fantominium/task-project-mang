// routes/projectRoutes.js

const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

// Search project
router.get('/search', projectController.searchProjects);

// Create project
router.post('/', projectController.createProject);

// Get projects
router.get('/', projectController.getProjects);

// Get project by ID
router.get('/:id', projectController.getProjectById);

// Update project
router.put('/:id', projectController.updateProject);

// Delete project
router.delete('/:id', projectController.deleteProject);

//Sort by Due Date
router.get('/sort/due-date', projectController.sortProjectsByDueDate);

//Sort by Create Date
router.get('/sort/create-date', projectController.sortProjectsByCreateDate);




module.exports = router;
