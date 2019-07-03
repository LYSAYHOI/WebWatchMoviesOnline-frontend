import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarServiceService } from '../../../Services/navbar-service.service';
import { LoginApiService } from '../../../Services/login-api.service'
import { Subscription, from } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from '../../../Services/auth-service.service'
import { SignUpApiService } from '../../../Services/sign-up-api.service'
import { DatePipe } from '@angular/common';
import decode from 'jwt-decode';
import { CollectionApiServiceService } from '../../../Services/collection-api-service.service';
import { IsLoginService } from '../../../Services/is-login.service';

@Component({
    selector: 'app-navbar-right',
    templateUrl: './navbar-right.component.html',
    styleUrls: ['./navbar-right.component.css'],
    providers: [DatePipe]
})
export class NavbarRightComponent implements OnInit, OnDestroy {

    public tabLogin: boolean = true;
    private userName: string;
    private passWord: string;
    private subscription: Subscription;
    private token: any;
    private isLogin: boolean;
    private isvalidUser: boolean;
    private isvalidPassword: boolean;
    private isError: boolean = false;

    private userNameSignUp: string;
    private passWordSignUp: string;
    private checkpassWordSignUp: string;
    private nameSignUp: string;
    private emailSignUp: string;
    private dobSignUp: number;
    private mobSignUp: number;
    private yobSignUp: number;
    private errorSignup: boolean;
    private getradio: boolean = true;

    constructor(
        private _UserLogingTabService: NavbarServiceService,
        private loginApiService: LoginApiService,
        private router: Router,
        private authServiceService: AuthServiceService,
        private signUpApiService: SignUpApiService,
        private datePipe: DatePipe,
        private collectionApiServiceService: CollectionApiServiceService,
        private isLoginService: IsLoginService
    ) { }

    jwtHelper = new JwtHelperService();

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    OnClose() {
        this._UserLogingTabService.ChangeStatus(false);
        this.userName = "";
        this.passWord = "";
        this.isvalidUser = true;
        this.isvalidPassword = true;
        this.userNameSignUp = "";
        this.passWordSignUp = "";
        this.checkpassWordSignUp = "";
        this.nameSignUp = "";
        this.emailSignUp = "";
        this.mobSignUp = 0;
        this.dobSignUp = 0;
        this.yobSignUp = 0;
        this.isvalidSingupUsername = true;
        this.isvalidSingupPassword = true;
        this.isvalidCheckpassWordSignUp = true;
        this.isvalidNameSignUp = true;
        this.isvalidSingupEmail = true;
        this.isvalidonBirthChange = true;
        this.isError = false;
    }

    onActivateTabLogin(value) {
        this.tabLogin = value;
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        if(this.jwtHelper.isTokenExpired(token) == false)
        {
            return true;
        } else {
            return false;
        }
    }

    onSubmit(username, password) {
        localStorage.removeItem('token')
        let user = {
            username: username,
            password: password
        }
        this.subscription = this.loginApiService.login(user).subscribe((response) => {
            this.token = response;
            let data = {
                accessToken: this.token.accessToken,
                tokenType: this.token.tokenType
            }

            localStorage.setItem('token', JSON.stringify(data));
            this.isLogin = true;

            const tokenPayload = decode(localStorage.getItem('token'));
            if (this.isAuthenticated() == true && 
            (tokenPayload.aud == "MEMBER, ADMIN" || tokenPayload.aud == "ADMIN, MEMBER")) {
                this.router.navigate(['admin']);
            }
            if (this.authServiceService.isAuthenticated()) {
                this.isLoginService.Login(true);
            }
        }, (error) => {
            this.isError = true;
        })
    }

    onLogout() {
        localStorage.removeItem('token');
        this.router.navigate(['']);
        this.isLoginService.Login(false);
        this.isvalidUser = true;
        this.isvalidPassword = true;
        this.isError = false;
        this.passWord = null;
        this.tabLogin = true;
    }

    //Validation form login
    onInputUserChange(event) {
        event.length < 6 || event.length > 20 ? this.isvalidUser = false : this.isvalidUser = true
    }
    onInputPasswordChange(event) {
        event.length < 6 || event.length > 30 ? this.isvalidPassword = false : this.isvalidPassword = true
    }
    //Validation form signup
    private isvalidSingupPassword: boolean
    private isvalidSingupEmail: boolean
    private isvalidSingupUsername: boolean
    private isvalidCheckpassWordSignUp: boolean
    private isvalidNameSignUp: boolean
    private isvalidonBirthChange: boolean
    private maxyear = new Date().getFullYear()
    private isvalidSingupUsernamerange: boolean;
    private isvalidSingupPasswordrange: boolean;
    private isErrorSignup: boolean = false;

    onUserNameSignUpChange(event) {
        let usernameinput = /^[a-zA-Z0-9]*$/;
        if (event.match(usernameinput) && event.length > 6 && event.length < 30) {
            this.isvalidSingupUsername = true;
        } else {
            this.isvalidSingupUsername = false;
        }
    }

    onPassWordSignUpChange(event) {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
        if (event.match(passw)) {
            this.isvalidSingupPassword = true;
        }
        else {
            this.isvalidSingupPassword = false;
        }
    }

    onEmailSignUpChange(event) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (event.match(mailformat)) {
            this.isvalidSingupEmail = true;
        } else {
            this.isvalidSingupEmail = false;
        }
    }

    onCheckpassWordSignUpChange(event) {
        this.passWordSignUp == this.checkpassWordSignUp ? this.isvalidCheckpassWordSignUp = true : this.isvalidCheckpassWordSignUp = false;
    }

    onNameSignUpChange(event) {
        var NameSignUp = /[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/ig;
        if (event.match(NameSignUp) || event.length < 6 || event.length > 40) {
            this.isvalidNameSignUp = false;
        } else {
            this.isvalidNameSignUp = true;
        }
    }

    validationDate(): boolean {
        var dateString = this.mobSignUp + '/' + this.dobSignUp + '/' + this.yobSignUp
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;
        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1970 || year > this.maxyear || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    onBirthChange(event) {
        this.validationDate() === true ? this.isvalidonBirthChange = true : this.isvalidonBirthChange = false;
    }

    onSignupSubmit(radio: boolean) {
        let data = {
            username: this.userNameSignUp,
            name: this.nameSignUp,
            email: this.emailSignUp,
            male: this.getradio,
            password: this.passWordSignUp,
            birthday: this.datePipe.transform(this.mobSignUp + '/' + this.dobSignUp + '/' + this.yobSignUp, "dd/MM/yyyy")
        }
        this.subscription = this.signUpApiService.singup(data).subscribe((response) => {
            this.userName = this.userNameSignUp;
            this.passWord = this.passWordSignUp;
            this.onSubmit(this.userNameSignUp, this.passWordSignUp);
            this.userNameSignUp = "";
            this.passWordSignUp = "";
            this.checkpassWordSignUp = "";
            this.nameSignUp = "";
            this.emailSignUp = "";
            this.mobSignUp = 0;
            this.dobSignUp = 0;
            this.yobSignUp = 0;
        }, (error) => {
            console.log(error);
            error.status === 412 ? this.errorSignup = true : this.errorSignup = false;
        })
    }

    getActive(e) {
        e.target.value == 1 ? this.getradio = true : this.getradio = false;
    }

    testkey(event){
        console.log(event);
    }


}
