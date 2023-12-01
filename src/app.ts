const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const basicAuth = require("express-basic-auth")
import { Request, Response } from "express";

const app = express();

//middleware CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET',
  credentials: true,
  optionsSuccess: 204,
}));

//middleware cache-control: no-cache
app.use((_req: Request, res: Response, next: () => void) => {
  console.log("Middleware ejecutandose");
  res.setHeader('Cache-control', 'no-cache');
  next();
});

const basicAuthMiddle = basicAuth({
  users: { 'usuario': '12345' },
  challenge: true,
  unauthorizedResponse: 'HTTP Status 401 - Unauthorized'
});

app.use('/todos', basicAuthMiddle);

type Todos = {
  id: number;
  title: string;
  completed: boolean;
};

app.use(bodyParser.json());
let todos: Todos[] = [];

app.get("/todos", (_req: Request, res: Response) => {
  res.json(todos);
});

app.post("/todos", (req: Request, res: Response) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed || todo.completed;
  res.json(todo);
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
