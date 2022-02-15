import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {ToasterService} from './toaster.service';

enum Events {
    REGISTER_USER = 'register user',
    CREATE_ROOM = 'create room',
    JOIN_ROOM = 'join room',
    LEAVE_ROOM = 'leave room',
    START_GAME = 'start game',
    END_GAME = 'end game',
    ERROR = 'error',
}

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private readonly SERVER_URL = 'http://localhost:6001';

    private socket: Socket;

    public constructor(private toasterService: ToasterService) {
        this.socket = io(this.SERVER_URL);
        this.initializeListeners();
    }

    public get socketId(): string {
        return this.socket.id;
    }

    public createRoom(roomName: string): void {
        this.socket.emit(Events.CREATE_ROOM, {roomName});
    }

    public joinRoom(roomName: string): void {
        this.socket.emit(Events.JOIN_ROOM, {roomName});
    }

    private initializeListeners(): void {
        this.socket.on(Events.CREATE_ROOM, ({id}) => {
            this.toasterService.toast(id);
        });

        this.socket.on(Events.JOIN_ROOM, ({id}) => {
            this.toasterService.toast(id);
        });

        this.socket.on(Events.ERROR, ({message}) => this.toasterService.toast(message));
    }
}
