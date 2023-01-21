import {Injectable} from '@angular/core';

import {AuthRequestService} from './auth-request.service';

import {AuthToken} from '../util/auth-token'
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private isLoggedInVal: boolean = false;
    private isSignedUpVal: boolean = false;

    private authToken: AuthToken = {access_token: null};

    constructor(private authRequestService: AuthRequestService, private cookieService: CookieService) {
        this.authToken.access_token = this.cookieService.get("access_token");
        if (this.authToken.access_token != null && this.authToken.access_token != "") {
            this.isLoggedInVal = true;
        }
    }

    getAuthToken() {
        return this.authToken;
    }

    isLoggedIn() {
        console.log(this.isLoggedInVal + " " + this.authToken.access_token)
        return this.isLoggedInVal;

    }

    isSignedUp() {
        return this.isSignedUpVal;
    }

    signUp(username: string, password: string) {
        this.authRequestService.signUpRequest({'username': username, 'password': password, 'error': ''}).subscribe({
            next: value => {
                if (value != undefined) {
                    console.log(value.username, value.password, value.error);
                    if (value.error == undefined || value.error == '') {
                        console.log("Successfully signed up");
                        this.isSignedUpVal = true;
                    } else {
                        console.log("Can't sign up");
                        this.isSignedUpVal = false;
                    }

                } else {
                    console.error("Problem with response after sign up request")
                }
            }
        })
    }

    signIn(username: string, password: string) {
        this.authRequestService.signInRequest(username, password).subscribe({
            next: value => {
                console.log(value);
                this.authToken.access_token = value.access_token;
                this.cookieService.set("access_token", value.access_token);
                if (this.authToken != undefined) {
                    this.isLoggedInVal = true;
                } else {
                    this.authToken = null;
                    this.isLoggedInVal = false;
                    console.error("invalid auth token");
                }
            }
        })
    }

    logOut() {
        this.cookieService.delete("access_token");
        this.authToken.access_token = '';
        this.isLoggedInVal = false;
    }


}
