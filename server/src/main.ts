import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {socket} from './socket';

const PORT = 6001;
const HOST = 'localhost';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:4200',
        credentials: true,
    },
});

app.get('/', (req, res) => {
    res.send('Server works!');
});

httpServer.listen(PORT, HOST, () => {
    console.log('Server is running ...');

    socket({io});
});
