// -----------------
// VARIÁVEIS GLOBAIS
// -----------------
// O endereço da nossa API. É uma boa prática guardar isso em uma variável.
const API_URL = "http://localhost:3001/tasks";

// Pegando as referências dos elementos HTML que vamos manipular
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// -----------------
// FUNÇÕES DE MANIPULAÇÃO DE TAREFAS
// -----------------

/**
 * Cria um elemento <li> para uma tarefa, incluindo o botão de deletar.
 * @param {object} task - O objeto da tarefa, vindo da API. Ex: { id: 1, title: '...', completed: false }
 * @returns {HTMLLIElement} O elemento <li> pronto para ser adicionado na tela.
 */
function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task.title;
  li.className = "task-item";
  li.dataset.id = task.id; // Guarda o ID da tarefa no próprio elemento

  if (task.completed) {
    li.classList.add("completed"); // Adiciona a classe se a tarefa estiver completa
  }

  // Cria o botão de deletar
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";
  // Adiciona o botão dentro do <li>
  li.appendChild(deleteBtn);

  return li;
}

/**
 * Busca todas as tarefas da API e as exibe na tela.
 */
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Não foi possível buscar as tarefas.");
    }
    const result = await response.json();
    const tasks = result.data; // O array de tarefas está em result.data

    // Limpa a lista atual antes de adicionar as novas
    taskList.innerHTML = "";

    // Para cada tarefa recebida, cria um elemento e o adiciona na lista (UL)
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
 * Envia uma requisição para deletar uma tarefa na API.
 * @param {string} id - O ID da tarefa a ser deletada.
 */
async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Falha ao deletar a tarefa.");
    }

    // Se deu certo, removemos o elemento da tela para um feedback visual instantâneo.
    document.querySelector(`[data-id='${id}']`).remove();
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    alert("Houve um erro ao deletar a tarefa.");
  }
}

/**
 * Envia uma requisição para atualizar uma tarefa na API.
 * @param {string} id - O ID da tarefa a ser atualizada.
 * @param {object} data - O dado a ser atualizado. Ex: { completed: true }
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

    // Se deu certo, buscamos a lista de novo para garantir que a tela está 100% correta.
    fetchTasks();
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    alert("Houve um erro ao atualizar a tarefa.");
  }
}

// -----------------
// ESCUTADORES DE EVENTOS (EVENT LISTENERS)
// -----------------

// Evento para quando o formulário de nova tarefa for enviado
taskForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Previne o recarregamento da página
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

    fetchTasks(); // Atualiza a lista com a nova tarefa
    taskInput.value = ""; // Limpa o campo
    taskInput.focus(); // Coloca o cursor de volta no campo
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    alert("Houve um erro ao adicionar a tarefa.");
  }
});

// Evento de clique na lista de tarefas (Delegação de Eventos)
taskList.addEventListener("click", async (event) => {
  const target = event.target; // O elemento exato que foi clicado

  // Se o clique foi em um botão de deletar
  if (target.classList.contains("delete-btn")) {
    const taskItem = target.closest(".task-item"); // Encontra o <li> pai
    const id = taskItem.dataset.id;
    deleteTask(id);
  }
  // Se o clique foi no texto de um item de tarefa
  else if (target.classList.contains("task-item")) {
    const id = target.dataset.id;
    const isCompleted = target.classList.contains("completed");
    // Envia o status oposto ao atual para a API
    updateTask(id, { completed: !isCompleted });
  }
});

// -----------------
// INICIALIZAÇÃO
// -----------------
// Chama a função para buscar as tarefas assim que a página é carregada.
fetchTasks();
