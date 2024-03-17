"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const call_router_1 = __importDefault(require("./resources/call/call.router"));
// const FileStoreStore = FileStore(Session);
const app = (0, express_1.default)();
const PORT = 4090;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005', 'http://localhost:3006', 'http://localhost:3007', 'http://localhost:3008', 'http://localhost:3009', 'https://gold-equinox-944579.postman.co/workspace/My-Workspace~34117823-5b80-4462-869c-cf1a00f6e8aa/request/19275652-71948daf-04a6-4498-8e4a-c83114d1b144'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: corsOptions
});
app.use('/api/nouns/', call_router_1.default);
var players = {};
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
exports.default = app;
//# sourceMappingURL=index.js.map