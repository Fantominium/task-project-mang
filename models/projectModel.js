// models/projectModel.js

const { ObjectId } = require('mongodb');

const Project = {
  collection: 'projects',
  
  createProject: async (db, project) => {
    const result = await db.collection(Project.collection).insertOne({
      projectName: project.projectName,
      projectStartDate: new Date(),
      projectEndDate: project.projectEndDate ? new Date(project.projectEndDate) : null,
    });
    return result.ops[0];
  },

  getAllProjects: async (db) => {
    return await db.collection(Project.collection).find().toArray();
  },

  getProjectById: async (db, id) => {
    return await db.collection(Project.collection).findOne({ _id: ObjectId.createFromHexString(id) });
  },

  updateProject: async (db, id, updateData) => {
    const updateFields = {};
    if (updateData.projectName) updateFields.projectName = updateData.projectName;
    if (updateData.projectEndDate) updateFields.projectEndDate = new Date(updateData.projectEndDate);

    const result = await db.collection(Project.collection).updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updateFields }
    );

    return result.modifiedCount > 0;
  },

  deleteProject: async (db, id) => {
    const result = await db.collection(Project.collection).deleteOne({ _id: ObjectId.createFromHexString(id) });
    return result.deletedCount > 0;
  },
};

module.exports = Project;
