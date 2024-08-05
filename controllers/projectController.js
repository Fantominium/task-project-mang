// controllers/projectController.js

const { mongoGet } = require('../config/mongocongo');
const Project = require('../models/projectModel');

const createProject = async (req, res) => {
  try {
    const db = mongoGet();
    const project = await Project.createProject(db, req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

const getProjects = async (req, res) => {
  try {
    const db = mongoGet();
    const projects = await Project.getAllProjects(db);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const db = mongoGet();
    const project = await Project.getProjectById(db, req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

const updateProject = async (req, res) => {
  try {
    const db = mongoGet();
    const updated = await Project.updateProject(db, req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const db = mongoGet();
    const deleted = await Project.deleteProject(db, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

// Search Projects by Name
const searchProjects = async (req, res) => {
  try {
    const db = mongoGet();
    const projects = await db.collection(Project.collection).find({
      projectName: { $regex: req.query.name, $options: 'i' }
    }).toArray();
    
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search projects' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  searchProjects,
};