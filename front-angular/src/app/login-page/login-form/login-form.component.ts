import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {UserService} from 'src/app/services/user.service';
import {NavigationService} from 'src/app/services/navigation.service';

@Component({
    selector: 'app-login-form',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

    constructor(private userService: UserService, private navigationService: NavigationService) {
    }

    loginErrorMessage: string = "Логин или Пароль не подходят";
    loginError: boolean = false;
    signUpErrorMessage: string = "Пользователь уже существует";
    signUpError: boolean = false;
    signUpSuccessMessage: string = "Пользователь успешно зарегистрирован";
    signUpSuccess: boolean = false;

    login = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);
    password = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);

    print(): void {
        console.log(this.login.value);
        console.log(this.password.value);
    }

    async signIn() {
        this.userService.logOut();
        this.signUpError=false
        this.signUpSuccess=false
        this.loginError=false

        this.signUpSuccess = undefined
        if (this.login.valid && this.password.valid) {
            this.print();
            this.userService.signIn(this.login.value, this.password.value);
            await new Promise(f => setTimeout(f, 2000));
            if (this.userService.isLoggedIn()) {
                console.log("logged in. token=", this.userService.getAuthToken().access_token);
                this.navigationService.goToMain();
                this.loginError = false;
            } else {
                this.loginError = true;
            }
        } else {
            this.login.markAsTouched();
            this.password.markAsTouched();
        }
    }

    async signUp() {
        this.signUpError=false
        this.signUpSuccess=false
        this.loginError=false
        this.userService.logOut();
        if (this.login.valid && this.password.valid) {
            this.print();
            this.userService.signUp(this.login.value, this.password.value);
            await new Promise(f => setTimeout(f, 2000));
            if (this.userService.isSignedUp()) {
                console.log("signed up");
                this.signUpError = false;
                this.signUpSuccess = true;
            } else {

                this.signUpError = true;
                this.signUpSuccess = false;
            }
        } else {
            this.login.markAsTouched();
            this.password.markAsTouched();
        }
    }

}