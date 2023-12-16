// const connection = require("../models/connections");
const connection = require("../models/connections");
const tasksModel = require("../models/tasksModel");

const getAll = async (_request, response) => {
  const tasks = await tasksModel.getAll();
  return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(request.body);
  return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;
  const deletedTask = await tasksModel.deleteTask(id);
  response.status(204).json(deletedTask);
};

const updateTask = async (request, response) => {
  const { id } = request.params;
  await tasksModel.updateTak(id, request.body);
  response.status(204).json();
  return tasksModel;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
