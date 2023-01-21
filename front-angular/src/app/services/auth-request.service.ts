import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AuthData} from '../util/auth-data'
import {AuthToken} from '../util/auth-token'

@Injectable({
    providedIn: 'root'
})
export class AuthRequestService {

    constructor(private http: HttpClient) {
    }

    signUpRequest(authData: AuthData) {
        return this.http.post<AuthData>("http://localhost:13400/user/save", authData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    signInRequest(username: string, password: string) {
        console.log("username=", username, "password=", password);
        return this.http.post<AuthToken>("http://localhost:13400/user/auth", {
            'username': username,
            'password': password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}
