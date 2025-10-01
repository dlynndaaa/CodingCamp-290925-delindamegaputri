const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");

const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");
const deleteAllBtn = document.getElementById("delete-all-btn");

let todos = [];

flatpickr("#date-input", { dateFormat: "d-m-Y" });

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        alert("Lengkapi form To-Do! Deskripsi tugas dan tanggal jatuh tempo wajib diisi.");
        return;
    }

    const isConfirmed = confirm(`Apakah Anda yakin ingin menambahkan tugas: "${task}"?`);

    if (!isConfirmed) {
        return;
    }

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
                <button class="action-btn done" onclick="markDoneHandler(${todo.id})" ${todo.status === 'done' ? 'disabled' : ''}>Done</button>
                <button class="action-btn delete" onclick="deleteTodoHandler(${todo.id})">Delete</button>
            </td>
        `;
        todoList.appendChild(tr);
    });
}

function deleteTodoHandler(id) {
    const todoToDelete = todos.find(todo => todo.id === id);

    const isConfirmed = confirm(`Yakin ingin menghapus tugas: "${todoToDelete.task}"?`);

    if (isConfirmed) {
        deleteTodo(id);
    }
}

function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos(todos);
}

function markDoneHandler(id) {
    const todoToMark = todos.find(todo => todo.id === id);

    const isConfirmed = confirm(`Anda akan menandai tugas "${todoToMark.task}" sebagai Selesai. Lanjutkan?`);

    if (isConfirmed) {
        markDone(id);
    }
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
    if (todos.length === 0) {
        alert("Tidak ada tugas untuk dihapus.");
        return;
    }

    const isConfirmed = confirm("PERINGATAN! Anda akan menghapus SEMUA tugas. Apakah Anda benar-benar yakin?");

    if (isConfirmed) {
        deleteAllTodos();
    }
});

function deleteAllTodos() {
    todos = [];
    renderTodos(todos);
}

renderTodos(todos);
