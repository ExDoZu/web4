import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {UserService} from 'src/app/services/user.service';
import {NavigationService} from 'src/app/services/navigation.service';

@Component({
    selector: 'app-logout-button',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './logout-button.component.html',
    styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {

    constructor(private userService: UserService, private navigationService: NavigationService) {
    }

    logout(): void {
        this.userService.logOut();
        this.navigationService.goToLogin();
    }

}
