import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import { authMessage } from './errors/errors.js';
import { getTrends } from './handlers/trend.js';
import { streamTweets } from './handlers/stream.js';

import { createServer } from "http";
import Server from "socket.io";

//import env config
dotenv.config();

//initialize app
const app = express();

//initialize server
const httpServer = createServer(app);

//initialize socket
const io = Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const port = process.env.PORT || 5000;
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;


//middleware
app.use(express.json())
app.use(helmet())
app.use(cors())

//public routes
app.get('/api/trends', getTrends)

io.on("connection", async (socket) => {
    console.log("Connected to client", socket.id)
    try {
        const token = BEARER_TOKEN;
        io.emit("connect", socket);
        streamTweets(socket, token);
    } catch (e) {
        io.emit("authError", authMessage);
    }
});

httpServer.listen(port, () => {
    console.log(`App running on port ${port}.`)
})














