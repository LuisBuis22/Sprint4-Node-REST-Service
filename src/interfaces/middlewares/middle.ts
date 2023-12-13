const cors = require("cors");
const basicAuth = require("express-basic-auth")
import { Request, Response } from "express";


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