import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IsLoginService } from '../../../Services/is-login.service'
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    constructor(
        private authServiceService: AuthServiceService,
        private isLoginService: IsLoginService,
        private cookie: CookieService
    ) { }

    jwtHelper = new JwtHelperService();
    
    ngOnInit() {
    }

    public isAuthenticated() {
        const token = localStorage.getItem('token');
        if(this.jwtHelper.isTokenExpired(token) == false)
        {
            return true;
        } else {
            return false;
        }
    }
}
