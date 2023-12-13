const express = require("express");
const bodyParser = require("body-parser");
import { Request, Response } from "express";

const app = express();

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