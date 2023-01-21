import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HitUpdaterService} from '../../services/hit-updater.service'

import {RegExValidator} from './RegExValidator';

@Component({
    selector: 'app-coordinates-form',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './coordinates-form.component.html',
    styleUrls: ['./coordinates-form.component.css']
})

export class CoordinatesFormComponent {

    @Output() onRadiusChange = new EventEmitter<number>()

    hitService: HitUpdaterService;

    x = new FormControl(null, [
        Validators.required,
    ]);

    y = new FormControl(null, [
        Validators.required,
        RegExValidator.patternValidator(/\b-?\d\b/, {isInRange: true}),
        Validators.min(-5),
        Validators.max(5),
    ]);

    r = new FormControl(null, [
        Validators.required,
        Validators.min(0),
    ]);

    constructor(hitService: HitUpdaterService) {
        this.hitService = hitService;
    }

    submit(): void {
        if (this.x.valid && this.y.valid && this.r.valid) {
            this.hitService.addHit(this.x.value, this.y.value, this.r.value);
        } else {
            this.x.markAsTouched();
            this.y.markAsTouched();
            this.r.markAsTouched();
        }
    }

    changeRadius() {
        if (this.r.value === '') return;
        let numRad = Number.parseFloat(this.r.value);
        if (numRad < 0) {
            this.r.markAsTouched();
        }
        this.onRadiusChange.emit(numRad);
    }

}