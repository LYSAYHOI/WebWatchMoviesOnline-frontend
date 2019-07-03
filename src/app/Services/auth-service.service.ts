import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    constructor() { }
    
    private jwtHelper = new JwtHelperService();

    public isAuthenticated() {
        if(localStorage.getItem("token") == null){
            return false;
        }
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }

    public checkRole(role:string): boolean{
        if(localStorage.getItem("token") == null){
            return false;
        }
        const token = localStorage.getItem('token');
        const tokenPayload = decode(localStorage.getItem('token'));
        if((tokenPayload.aud).search(role) == -1){
            return false;
        }else return true;
    }
}
