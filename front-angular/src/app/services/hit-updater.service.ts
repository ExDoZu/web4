import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

import {Result} from '../main-page/results-table/results'
import {HitCheckService} from './hit-check.service'

@Injectable({
    providedIn: 'root'
})
export class HitUpdaterService {

    private hitRequestStatusStorage = new Subject<Result[]>();

    hitRequestStatus$ = this.hitRequestStatusStorage

    constructor(private hitCheckService: HitCheckService) {

    }

    addHit(x: number, y: number, r: number): void {
        this.hitCheckService.addPointRequest(x, y, r)
            .subscribe({
                next: value => {
                    this.hitRequestStatusStorage.next(value)
                }
            })
    };

    getAllHits(): void {
        this.hitCheckService.getPointsRequest()
            .subscribe({
                next: value => {
                    this.hitRequestStatusStorage.next(value)
                }
            })
    };

}
