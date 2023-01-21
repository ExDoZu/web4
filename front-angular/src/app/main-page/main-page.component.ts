import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-main-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

    radius = 2;

    updateRadius(newRad: number) {
        this.radius = newRad;
    }

    constructor() {
    }

}