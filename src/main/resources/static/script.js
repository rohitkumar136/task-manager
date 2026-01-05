/*const API_URL = "http://localhost:8080/api/tasks";*/
const  API_URL= "http://34.246.202.97:8081/api/tasks";

let editingTaskId = null;

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("taskTable");
            table.innerHTML = "";

            data.forEach(task => {
                table.innerHTML += `
                    <tr>
                        <td>${task.title}</td>
                        <td>${task.description}</td>
                        <td>${task.status}</td>
                        <td>
                            <button class="edit-btn"
                                onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.status}')">
                                ✏️
                            </button>
                            <button class="delete-btn"
                                onclick="deleteTask(${task.id})">
                                ❌
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

function saveTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;

    if (!title) {
        alert("Title is required");
        return;
    }

    const task = { title, description, status };

    let url = API_URL;
    let method = "POST";

    if (editingTaskId !== null) {
        url = `${API_URL}/${editingTaskId}`;
        method = "PUT";
    }

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    }).then(() => {
        resetForm();
        loadTasks();
    });
}

function editTask(id, title, description, status) {
    editingTaskId = id;

    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("status").value = status;

    document.getElementById("saveBtn").innerText = "Update Task";
}

function deleteTask(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadTasks());
}

function resetForm() {
    editingTaskId = null;

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("status").value = "TODO";

    document.getElementById("saveBtn").innerText = "Add Task";
}
