const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");

const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");
const deleteAllBtn = document.getElementById("delete-all-btn");

let todos = [];

flatpickr("#date-input", { dateFormat: "Y-m-d" });

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) return;

  const todo = { id: Date.now(), task, date, status: "pending" };
  todos.push(todo);
  renderTodos(todos);

  taskInput.value = "";
  dateInput.value = "";
});

function renderTodos(list) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  list.forEach((todo) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td><span class="status ${todo.status}">${todo.status}</span></td>
      <td>
        <button class="action-btn done" onclick="markDone(${todo.id})">Done</button>
        <button class="action-btn delete" onclick="deleteTodo(${todo.id})">Delete</button>
      </td>
    `;
    todoList.appendChild(tr);
  });
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos(todos);
}

function markDone(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, status: "done" } : todo
  );
  renderTodos(todos);
}

filterBtn.addEventListener("click", () => {
  filterMenu.classList.toggle("show");
});

document.querySelectorAll("#filter-menu .dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    const status = this.dataset.status;

    if (status === "all") {
      renderTodos(todos);
    } else {
      renderTodos(todos.filter((todo) => todo.status === status));
    }

    filterMenu.classList.remove("show");
  });
});

deleteAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos(todos);
});

renderTodos(todos);
