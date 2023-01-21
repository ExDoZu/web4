import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";

import {Result} from './results';
import {HitUpdaterService} from '../../services/hit-updater.service'

@Component({
    selector: 'app-results-table',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './results-table.component.html',
    styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent {

    hitServiceSubscription!: Subscription;
    results: Result[] = [];
    hitService: HitUpdaterService;

    constructor(hitService: HitUpdaterService) {
        this.hitService = hitService;

        this.hitService.hitRequestStatus$.subscribe({
            next: value => {
                if (value != null && value != undefined) {
                    if (value.length >= this.results.length) {
                        this.results = value.reverse();
                    } else {
                        this.results.unshift(value as unknown as Result);
                    }
                    console.log("table", this.results);

                }
            }
        });

        this.hitService.getAllHits();
    }

}