const connection = require("./connections");

const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks;");
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;
  const now = Date.now();

  // const dateUTC = new Date(1700140198450);
  let dateUTC = new Date(now);
  dateUTC.toUTCString;

  const query =
    "INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)";

  // The bind parameters must not be functions
  const [createdTask] = await connection.execute(query, [
    title,
    "pendente",
    dateUTC,
  ]);

  return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
  const deletedTask = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
  return deletedTask;
};

const updateTask = async (id, task) => {
  const query = "UPDATE tasks SET title = ?, status = ? WHERE id = ?";
  const { title, status } = task;

  const updatedTask = await connection.execute(query, [title, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
