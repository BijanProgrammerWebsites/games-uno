import {Component} from '@angular/core';
import {SocketService} from '../../services/socket.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public roomToBeCreated: string = 'roomToBeCreated';
    public roomToBeJoined: string = 'roomToBeJoined';

    public constructor(public socketService: SocketService) {}

    public createRoom(): void {
        if (!HomeComponent.roomNameValidation(this.roomToBeCreated)) return;

        this.socketService.createRoom(this.roomToBeCreated);
    }

    public joinRoom(): void {
        if (!HomeComponent.roomNameValidation(this.roomToBeJoined)) return;

        this.socketService.joinRoom(this.roomToBeJoined);
    }

    private static roomNameValidation(name: string): boolean {
        return !!name.trim();
    }
}
