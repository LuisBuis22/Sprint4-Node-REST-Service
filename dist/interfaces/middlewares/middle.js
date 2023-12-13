"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const basicAuth = require("express-basic-auth");
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
//# sourceMappingURL=middle.js.map