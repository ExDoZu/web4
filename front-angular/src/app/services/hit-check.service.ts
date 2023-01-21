import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserService} from './user.service';

import {Result} from '../main-page/results-table/results'

@Injectable({
    providedIn: 'root'
})
export class HitCheckService {

    constructor(private http: HttpClient, private userService: UserService) {
    }

    getPointsRequest() {
        return this.http.get<Result[]>("http://localhost:13400/api/points", {
            observe: 'body', responseType: 'json', headers: {
                'Authorization': this.userService.getAuthToken().access_token
            }
        })
    }

    addPointRequest(x: number, y: number, r: number) {
        return this.http.post<Result[]>("http://localhost:13400/api/points/checkhit", {'x': x, 'y': y, 'r': r}, {
            observe: 'body', responseType: 'json', headers: {
                'Authorization': this.userService.getAuthToken().access_token
            }
        })
    }

}
