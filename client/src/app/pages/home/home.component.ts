import {Component} from '@angular/core';
import {SocketService} from '../../services/socket.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public roomName: string = '';

    public constructor(public socketService: SocketService) {}

    public createRoom(): void {
        if (!this.roomName) return;

        this.socketService.createRoom(this.roomName);
    }
}
