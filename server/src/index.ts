import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import callRouter from './resources/call/call.router';

// const FileStoreStore = FileStore(Session);

const app = express();
const PORT = 4090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005', 'http://localhost:3006', 'http://localhost:3007', 'http://localhost:3008', 'http://localhost:3009', 'https://gold-equinox-944579.postman.co/workspace/My-Workspace~34117823-5b80-4462-869c-cf1a00f6e8aa/request/19275652-71948daf-04a6-4498-8e4a-c83114d1b144'],
  credentials: true,
};
app.use(cors(corsOptions));


const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
});

app.use('/api/nouns/', callRouter);

var players = {}

// io.on('connection', function (socket) {
//   console.log('player [' + socket.id + '] connected')

//   players[socket.id] = {
//     rotation: 0,
//     x: 30,
//     y: 30,
//     playerId: socket.id,
//   }

//   socket.emit('currentPlayers', players)
//   socket.broadcast.emit('newPlayer', players[socket.id])
 
//   socket.on('disconnect', function () {
//     console.log('player [' + socket.id + '] disconnected')
//     delete players[socket.id]
//     io.emit('playerDisconnected', socket.id)
//   })

//   socket.on('playerMovement', function (movementData) {
//     players[socket.id].x = movementData.x
//     players[socket.id].y = movementData.y
//     players[socket.id].rotation = movementData.rotation

//     socket.broadcast.emit('playerMoved', players[socket.id])
//   })
// })

server.listen(PORT, () => {
  console.log('App listening on port:', PORT);
});

export default app;


