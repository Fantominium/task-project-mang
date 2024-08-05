// routes/projectRoutes.js

const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

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

// Search project
router.get('/search', projectController.searchProjects);

module.exports = router;
