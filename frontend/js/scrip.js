const tbody = document.querySelector("tbody");
const addForm = document.querySelector("#add-form");
const addInput = document.querySelector(".add-input");

//conect with api
const fetchTasks = async () => {
  const response = await fetch("http://127.0.0.1:3333/tasks");
  const tasks = await response.json();
  return tasks;
};

const addTask = async (event) => {
  event.preventDefault();

  const task = { title: addInput.value };

  await fetch("http://127.0.0.1:3333/tasks", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  loadTasks();

  addInput.value = "";
};

const deleteTask = async (id) => {
  await fetch(`http://127.0.0.1:3333/tasks/${id}`, {
    method: "delete",
  });

  loadTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://127.0.0.1:3333/tasks/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
};

const formatDate = (dateUTC) => {
  const config = { dateStyle: "long", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", config);

  return date;
};

const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};

const createSelect = (value) => {
  const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluído">concluído</option>
  `;

  const select = createElement("select", "", options);

  select.value = value;

  return select;
};

// const task = {
//   id: 1,
//   title: "How greet in English",
//   created_at: "november 27th 2023 10:00",
//   status: "concluído",
// };

const createRow = (tasks) => {
  const { id, title, created_at, status } = tasks;

  //create elements
  const tr = createElement("tr");
  const tdTitle = createElement("td", title);
  const tdCreated_at = createElement("td", formatDate(created_at));
  const tdStatus = createElement("td");
  const tdActions = createElement("td");

  //edit title
  const editForm = createElement("form");
  const editInput = createElement("input");
  editInput.value = title;
  editForm.appendChild(editInput);

  //created select
  const select = createSelect(status);

  //created action buttons
  const editButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined"> edit </span>'
  );
  const deleteButton = createElement(
    "button",
    "hello, toDoList",
    '<span class="material-symbols-outlined"> delete </span>'
  );

  //assignment id and class for elemtents
  tr.classList = "table-row";
  tdTitle.classList = "td";
  tdCreated_at.classList = "td";
  tdStatus.classList = "td";
  tdActions.classList = "td";
  select.id = "select-status";
  editButton.classList = "btn-action";
  deleteButton.classList = "btn-action";

  //adding eventListener to delete button
  deleteButton.addEventListener("click", () => deleteTask(id));
  select.addEventListener("change", ({ target }) =>
    updateTask({ ...tasks, status: target.value })
  );

  //editbutton event
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    updateTask({ id, title: editInput.value, status });
  });

  editButton.addEventListener("click", () => {
    tdTitle.innerHTML = "";
    tdTitle.appendChild(editForm);
  });

  //created table
  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreated_at);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

//connect to database and load all the tasks
const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

addForm.addEventListener("submit", addTask);

loadTasks();
