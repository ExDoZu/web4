import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";

import {Result} from '../results-table/results';
import {HitUpdaterService} from '../../services/hit-updater.service'

@Component({
    selector: 'app-graph',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent {

    hitServiceSubscription!: Subscription;
    private resultsGraph: Result[] = [];
    hitService: HitUpdaterService;

    getResults(): Result[] {
        return this.resultsGraph;
    }

    readonly dashes = Array<number>();
    r = 2;
    Dpath = '';

    @Input() set radius(num: number) {
        this.r = num;
        if (this.r >= 0) {
            this.updateDpath();
        }
    }

    constructor(hitService: HitUpdaterService) {
        this.hitService = hitService;
        this.updateDpath();
        for (let i = 30; i <= 270; i += 60) {
            this.dashes.push(i);
        }

        this.hitService.hitRequestStatus$.subscribe({
            next: value => {
                if (value != null) {
                    if (value.length >= this.resultsGraph.length) {
                        // console.log("replace", value);
                        this.resultsGraph = value;
                    }
                }
            }
        });
        console.log("graph", this.resultsGraph);
        // this.hitService.getAllHits();
    }

    updateDpath() {
        this.Dpath = `M 150 150
                  L 150 ${150 + this.r * 20}
                  L ${150 - this.r * 40} 150
                  L 150 150
                  L 150 ${150 - this.r * 20}
                  L ${150 + this.r * 40} ${150 - this.r * 20}
                  L ${150 + this.r * 40} 150
                  L ${150 + this.r * 20} 150
                  A ${this.r * 20} ${this.r * 20} 0 0 1 150 ${150 + this.r * 20}
                  L 150 150
                  `
    }

    checkHit(event: MouseEvent) {
        let x = Number.parseFloat(((event.offsetX - 150) / 40).toFixed(2));
        let y = Number.parseFloat(((event.offsetY - 150) / -40).toFixed(2));
        if (x < -5 || x > 5 || y < -5 || y > 5) return;
        if (this.r >= 0) {
            this.hitService.addHit(x, y, this.r);
        }
    }

}