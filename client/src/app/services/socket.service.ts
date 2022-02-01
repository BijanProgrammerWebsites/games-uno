import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';

enum Events {
    REGISTER_USER = 'register user',
    CREATE_ROOM = 'create room',
    JOIN_ROOM = 'join room',
    LEAVE_ROOM = 'leave room',
    START_GAME = 'start game',
    END_GAME = 'end game',
}

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private readonly SERVER_URL = 'http://localhost:6001';

    private socket: Socket;

    public constructor() {
        this.socket = io(this.SERVER_URL);
    }

    public get socketId(): string {
        return this.socket.id;
    }

    public createRoom(roomName: string): void {
        this.socket.emit(Events.CREATE_ROOM, {roomName});
    }
}
