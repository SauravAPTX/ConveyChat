// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import path from "path";

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










import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import Redis from 'ioredis';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const redisUri = process.env.REDIS_URI as string;
const redis = new Redis(redisUri);

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

const clients: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');
  clients.push(ws);

  ws.on('message', async (data: string) => {
    try {
      const message: Message = JSON.parse(data);
      message.timestamp = new Date().toISOString(); // Add timestamp server-side for consistency

      const messageString = JSON.stringify(message);

      // Broadcast message to all connected clients
      clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageString);
        }
      });

      // Save message to Redis
      await redis.lpush('messages', messageString);
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send('Error: Invalid message format');
    }
  });

  ws.on('error', (error: Error) => {
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
app.get('/messages', async (req, res) => {
  try {
    const messages = await redis.lrange('messages', 0, -1);
    res.json(messages.map(message => JSON.parse(message)));
  } catch (error) {
    res.status(500).send('Failed to retrieve messages');
  }
});

app.get('/', (req, res) => res.send('Chat App Server'));
app.get('/message', (req, res) => res.send('Message Server'));

server.listen(3001, () => {
  console.log(`Server started on this http://localhost:3001`);
});
