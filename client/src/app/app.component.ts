import {Component} from '@angular/core';
import {ToasterService} from './services/toaster.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public constructor(public toasterService: ToasterService) {}
}
