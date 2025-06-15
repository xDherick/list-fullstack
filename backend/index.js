const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite com sucesso.");
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar a tabela 'tasks':", err.message);
        } else {
          console.log("Tabela 'tasks' pronta para uso.");
        }
      }
    );
  }
});

app.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks ORDER BY id DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.put("/tasks/:id/", (req, res) => {
  const { title, completed } = req.body;
  const { id } = req.params;

  let sql = "UPDATE tasks SET ";
  const params = [];

  if (title) {
    sql += "title = ?, ";
    params.push(title);
  }

  if (completed !== undefined) {
    sql += "completed = ?, ";
    params.push(completed);
  }

  sql = sql.slice(0, -2);

  sql += " WHERE id = ?";
  params.push(id);

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Tarefa não encontrada." });
      return;
    }
    res.json({
      message: "Tarefa atualizada com sucesso.",
      changes: this.changes,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Olá! O servidor da sua To-Do List está no ar! 🚀");
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: "O título da tarefa é obrigatório." });
    return;
  }

  const sql = "INSERT INTO tasks (title) VALUES (?)";
  db.run(sql, [title], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: "success",
      data: {
        id: this.lastID,
        title: title,
        completed: false,
      },
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.delete("/tasks/:id/", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tasks WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Tarefa não encontrada." });
      return;
    }
    res.json({
      message: "Tarefa deletada com sucesso.",
      changes: this.changes,
    });
  });
});
