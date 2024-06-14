"use strict";
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import path from "path";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const JWT_SECRET = "test123";
// const app = express();
// app.use(cookieParser());
// app.use(express.json());
// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:5173"
// }));
// app.post("/signin", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     // do db validations, fetch id of user from db
//     const token = jwt.sign({
//         id: 1
//     }, JWT_SECRET);
//     res.cookie("token", token);
//     res.send("Logged in!");
// });
// app.get("/user", (req, res) => {
//     const token = req.cookies.token;
//     const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     // Get email of the user from the database
//     res.send({
//         userId: decoded.id
//     })
// });
// app.post("/logout", (req, res) => {
//     res.cookie("token", "ads");
//     res.json({
//         message: "Logged out!"
//     })
// });
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../src/index.html"))
// })
// app.listen(3000);
// import express from 'express'
// import { WebSocketServer,WebSocket } from 'ws'
// const app= express()
// const httpServer = app.listen(8080, () => {
//   console.log('Server is listening on port 8080');
// });
// app.get('/', (req, res) => {
//   res.send('Hey man');
// });
// var users=0
// const wss= new WebSocketServer({server: httpServer})
// wss.on('connection', function connection(ws) {
//     ws.on('error', console.error);
//     ws.on('message', function message(data, isBinary) {
//       wss.clients.forEach(function each(client) {
//         if (client.readyState === ws.OPEN) {
//           client.send(data, { binary: isBinary });
//         }
//       });
//     });
//     console.log("Total Users:",++users)
//     ws.send('Hello! Message From Server!!');
// });
// const Redis = require("ioredis");
// const redis = new Redis(redisUri);
// async function manageKeyValue() {
//     try {
//         // Set value in Redis
//         await redis.set("key", "hello world");
//         // Get value from Redis
//         const result: string | null = await redis.get("key");
//         if (result !== null) {
//             console.log(`The value of key is: ${result}`);
//         } else {
//             console.log("Key not found");
//         }
//     } catch (error) {
//         console.error("Redis operation failed:", error);
//     } finally {
//         // Disconnect after operations are complete
//         redis.disconnect();
//     }
// }
// manageKeyValue();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Middleware to parse JSON bodies
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const redisUri = process.env.REDIS_URI;
const redis = new ioredis_1.default(redisUri);
const clients = [];
wss.on('connection', (ws) => {
    console.log('Client connected');
    clients.push(ws);
    ws.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const message = JSON.parse(data);
            message.timestamp = new Date().toISOString(); // Add timestamp server-side for consistency
            const messageString = JSON.stringify(message);
            // Broadcast message to all connected clients
            clients.forEach((client) => {
                if (client.readyState === ws_1.WebSocket.OPEN) {
                    client.send(messageString);
                }
            });
            // Save message to Redis
            yield redis.lpush('messages', messageString);
        }
        catch (error) {
            console.error('Error processing message:', error);
            ws.send('Error: Invalid message format');
        }
    }));
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});
// Endpoint to retrieve chat history
app.get('/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield redis.lrange('messages', 0, -1);
        res.json(messages.map(message => JSON.parse(message)));
    }
    catch (error) {
        res.status(500).send('Failed to retrieve messages');
    }
}));
app.get('/', (req, res) => res.send('Chat App Server'));
app.get('/message', (req, res) => res.send('Message Server'));
server.listen(3001, () => {
    console.log(`Server started on this http://localhost:3001`);
});
