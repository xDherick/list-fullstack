# Projeto Fullstack: Lista de Tarefas (To-Do List)

Um projeto fullstack simples de uma Lista de Tarefas (To-Do List) construído para fins de aprendizado, cobrindo todas as etapas de desenvolvimento, do banco de dados à interface do usuário.

## ✨ Funcionalidades

* **Adicionar Tarefas:** Criar novas tarefas que são salvas no banco de dados.
* **Listar Tarefas:** Visualizar todas as tarefas existentes.
* **Marcar como Concluída:** Clicar em uma tarefa para alternar seu status entre pendente e concluída.
* **Deletar Tarefas:** Remover tarefas da lista e do banco de dados.

## 🚀 Tecnologias Utilizadas

Este projeto foi dividido em duas partes principais:

### Backend

* **Node.js:** Ambiente de execução para o JavaScript no servidor.
* **Express.js:** Framework para a construção da API REST e gerenciamento de rotas.
* **SQLite3:** Banco de dados SQL leve e baseado em arquivo, para persistência dos dados.
* **Nodemon:** Ferramenta de desenvolvimento que reinicia o servidor automaticamente a cada alteração no código.
* **CORS:** Middleware para permitir requisições entre o frontend e o backend.

### Frontend

* **HTML5:** Linguagem de marcação para a estrutura da página.
* **CSS3:** Linguagem de estilização para o design da interface.
* **JavaScript (ES6+):** Linguagem de programação para a interatividade do frontend, incluindo consumo da API com `fetch` e manipulação do DOM.

## 📂 Estrutura do Projeto

O projeto está organizado em duas pastas principais para uma clara separação de responsabilidades:

-   `/frontend`: Contém todos os arquivos da interface do usuário (`index.html`, `style.css`, `script.js`).
-   `/backend`: Contém toda a lógica do servidor, API e banco de dados.

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

### Pré-requisitos

* Você precisa ter o [Node.js](https://nodejs.org/) (que já inclui o npm) instalado.
* Você precisa ter o [Git](https://git-scm.com/) instalado.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/xDherick/list-fullstack](https://github.com/xDherick/list-fullstack.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd NOME-DO-SEU-REPOSITORIO
    ```

3.  **Configure e inicie o Backend:**
    ```bash
    # Entre na pasta do backend
    cd backend

    # Instale as dependências
    npm install

    # Inicie o servidor do backend
    npm start
    ```
    *O terminal deverá exibir "Servidor rodando na porta 3001". Mantenha este terminal aberto.*

4.  **Inicie o Frontend:**
    * Abra o arquivo `frontend/index.html` em seu navegador.
    * **(Recomendado)** Se você usa o Visual Studio Code com a extensão "Live Server", clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

Pronto! A aplicação deve estar funcionando completamente.
