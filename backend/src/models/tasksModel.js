const connection = require("./connections");

//get all datas of the database
const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks;");
  return tasks;
};

//create a new task
const createTask = async (task) => {
  const { title } = task;
  const now = Date.now();

  // const dateUTC = new Date(1700140198450);
  let dateUTC = new Date(now);
  dateUTC.toUTCString;

  const query =
    "INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)";

  //the bind parameters must not be function(s).
  const [createdTask] = await connection.execute(query, [
    title,
    "pendente",
    dateUTC,
  ]);

  return { insertId: createdTask.insertId };
};

//delete some content by id
const deleteTask = async (id) => {
  const deletedTask = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
  return deletedTask;
};

//update task by id
const updateTak = async (id, task) => {
  const query = "UPDATE tasks SET title = ?, status = ? WHERE id = ?";
  const { title, status } = task;

  const updatedTask = await connection.execute(query, [title, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTak,
};
