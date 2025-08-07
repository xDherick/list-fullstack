const API_URL = "http://localhost:3001/tasks";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

/** 
  @param {object} task
  @returns {HTMLLIElement} 
 */
function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task.title;
  li.className = "task-item";
  li.dataset.id = task.id; 

  if (task.completed) {
    li.classList.add("completed"); 
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";
  li.appendChild(deleteBtn);

  return li;
}

async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Não foi possível buscar as tarefas.");
    }
    const result = await response.json();
    const tasks = result.data;

    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    });
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    alert("Houve um erro ao carregar as tarefas.");
  }
}

/**
 
 @param {string} id 
 */
async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Falha ao deletar a tarefa.");
    }

    document.querySelector(`[data-id='${id}']`).remove();
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    alert("Houve um erro ao deletar a tarefa.");
  }
}

/**

  @param {string} id 
  @param {object} data 
 */
async function updateTask(id, data) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a tarefa.");
    }

    fetchTasks();
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    alert("Houve um erro ao atualizar a tarefa.");
  }
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault(); 
  const title = taskInput.value.trim();

  if (!title) {
    alert("Por favor, digite o nome da tarefa.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });

    if (!response.ok) {
      throw new Error("Não foi possível adicionar a tarefa.");
    }

    fetchTasks(); 
    taskInput.value = ""; 
    taskInput.focus(); 
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    alert("Houve um erro ao adicionar a tarefa.");
  }
});

taskList.addEventListener("click", async (event) => {
  const target = event.target; 
  if (target.classList.contains("delete-btn")) {
    const taskItem = target.closest(".task-item");
    const id = taskItem.dataset.id;
    deleteTask(id);
  }

  else if (target.classList.contains("task-item")) {
    const id = target.dataset.id;
    const isCompleted = target.classList.contains("completed");
    updateTask(id, { completed: !isCompleted });
  }
});

fetchTasks();
