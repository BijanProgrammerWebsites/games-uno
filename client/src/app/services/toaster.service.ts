import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ToasterService {
    private static readonly TOAST_DURATION: number = 3000;

    public messages: string[] = [];

    public toast(message: any): void {
        this.messages.push(message.toString());
        setTimeout(() => this.messages.shift(), ToasterService.TOAST_DURATION);
    }
}
