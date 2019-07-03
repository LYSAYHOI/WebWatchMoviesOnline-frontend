import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthServiceService } from './auth-service.service'
import decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    constructor(
        private auth: AuthServiceService, 
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        if(localStorage.getItem("token") == null){
            this.router.navigate(['/*']);
            return false;
        }
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        const tokenPayload = decode(token);
        if (
            !this.auth.isAuthenticated() ||
            (tokenPayload.aud).search(expectedRole) == -1
        ) {
            this.router.navigate(['/*']);
            return false;
        }
        return true;
    }
}
