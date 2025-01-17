// models/todoModel.js

const { ObjectId } = require('mongodb');

const Todo = {
  collection: 'todos',
  
  createTodo: async (db, todo) => {
    const result = await db.collection(Todo.collection).insertOne({
      todoName: todo.todoName,
      todoCompleted: false,
      projectId: todo.projectId ? ObjectId.createFromHexString(todo.projectId) : null,
      todoDueDate: todo.todoDueDate ? new Date(todo.todoDueDate) : null,
      todoCreateDate: new Date(),
      todoCompletedDate: null,
    });

    return result;
  },

  getAllTodos: async (db) => {
    return await db.collection(Todo.collection).find().toArray();
  },

  getTodoById: async (db, id) => {
    return await db.collection(Todo.collection).findOne({ _id: ObjectId.createFromHexString(id) });
  },

  updateTodo: async (db, id, updateData) => {
    const updateFields = {};
    if (updateData.todoName) updateFields.todoName = updateData.todoName;
    if (updateData.todoCompleted !== undefined) {
      updateFields.todoCompleted = updateData.todoCompleted;
      updateFields.todoCompletedDate = updateData.todoCompleted ? new Date() : null;
    }
    if (updateData.todoDueDate) updateFields.todoDueDate = new Date(updateData.todoDueDate);
    if (updateData.projectId) updateFields.projectId = ObjectId.createFromHexString(updateData.projectId);

    const result = await db.collection(Todo.collection).updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updateFields }
    );

    return result.modifiedCount > 0;
  },

  deleteTodo: async (db, id) => {
    const result = await db.collection(Todo.collection).deleteOne({ _id: ObjectId.createFromHexString(id) });
    return result.deletedCount > 0;
  },

   //Sort by Due Date
   sortTodosByDueDate: async (db) => {
    return await db
      .collection(Todo.collection)
      .find()
      .sort({ todoDueDate: -1 })
      .toArray();
  },

  //Sort by Create Date
  sortTodosByCreateDate: async (db) => {
    return await db
      .collection(Todo.collection)
      .find()
      .sort({ todoCreateDate: -1 })
      .toArray();
  },

    //Sort by Completed Date
    sortTodosByCompletedDate: async (db) => {
      return await db
        .collection(Todo.collection)
        .find()
        .sort({ todoCompletedDate: -1 })
        .toArray();
    },
    toggleTodoCompleted: async (db, id) => {
      const todo = await db.collection(Todo.collection).findOne({ _id: ObjectId.createFromHexString(id) });
  
      if (!todo) {
        return null;
      }
  
      const newCompletedState = !todo.todoCompleted;
      const updateData = {
        todoCompleted: newCompletedState,
        todoCompletedDate: newCompletedState ? new Date() : null,
      };
  
      const result = await db.collection(Todo.collection).updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: updateData }
      );
  
      return result.modifiedCount > 0 ? newCompletedState : null;
    },

    assignTodoToProject: async (db, todoName, projectName) => {
      const project = await db.collection('projects').findOne({ projectName: projectName });
  
      if (!project) {
        throw new Error('Project not found');
      }
  
      const result = await db.collection(Todo.collection).updateOne(
        { todoName: todoName },
        { $set: { projectId: project._id } }
      );
  
      return result.modifiedCount > 0;
    },

};

module.exports = Todo;
