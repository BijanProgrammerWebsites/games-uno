import {Server, Socket} from 'socket.io';
import {Room} from './models/room';

enum Events {
    CREATE_ROOM = 'create room',
    JOIN_ROOM = 'join room',
    LEAVE_ROOM = 'leave room',
    START_GAME = 'start game',
    END_GAME = 'end game',
    ERROR = 'error',
}

const rooms: Room[] = [];

const createRoom = (socket: Socket, roomName: string): void => {
    if (rooms.find((x) => x.name === roomName)) {
        socket.emit(Events.ERROR, {message: 'room already exists!'});
        return;
    }

    const room = new Room({id: socket.id}, roomName);
    rooms.push(room);

    socket.emit(Events.CREATE_ROOM, {id: room.id});
};

const joinRoom = (socket: Socket, roomName: string): void => {
    const room = rooms.find((x) => x.name === roomName);
    const user = {id: socket.id};

    if (!room) {
        socket.emit(Events.ERROR, {message: 'room does not exists!'});
        return;
    }

    if (room.includeMember(user)) {
        socket.emit(Events.ERROR, {message: 'user has already joined the room!'});
        return;
    }

    room.addMember(user);

    socket.emit(Events.JOIN_ROOM, {id: room.id});
};

const socket = ({io}: {io: Server}) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User with the id of ${socket.id} connected ...`);

        socket.on(Events.CREATE_ROOM, ({roomName}) => {
            createRoom(socket, roomName);
        });

        socket.on(Events.JOIN_ROOM, ({roomName}) => {
            joinRoom(socket, roomName);
        });
    });
};

export {socket};
