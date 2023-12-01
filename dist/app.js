"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const basicAuth = require("express-basic-auth");
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET',
    credentials: true,
    optionsSuccess: 204,
}));
app.use((_req, res, next) => {
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
app.use(bodyParser.json());
let todos = [];
app.get("/todos", (_req, res) => {
    res.json(todos);
});
app.post("/todos", (req, res) => {
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: req.body.completed || false,
    };
    todos.push(todo);
    res.status(201).json(todo);
});
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed || todo.completed;
    res.json(todo);
});
app.delete("/todos/:id", (req, res) => {
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
//# sourceMappingURL=app.js.map