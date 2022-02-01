import {Server, Socket} from 'socket.io';

enum Events {
    CREATE_ROOM = 'create room',
    JOIN_ROOM = 'join room',
    LEAVE_ROOM = 'leave room',
    START_GAME = 'start game',
    END_GAME = 'end game',
}

const socket = ({io}: {io: Server}) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User with the id of ${socket.id} connected ...`);

        socket.on(Events.CREATE_ROOM, ({roomName}) => {
            console.log({roomName});
        });
    });
};

export {socket};
