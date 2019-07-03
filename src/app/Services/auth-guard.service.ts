import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        public auth: AuthServiceService,
        public router: Router
    ) { }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): Promise<boolean> | boolean {
    //        return new Promise(resolve =>
    //          this.auth.isAuthenticated()
    //            .then(status: boolean => {
    //              if(status === false) {
    //                this.router.navigate(["login"]);
    //              }
    //              resolve(status);
    //            })
    //            .catch(() => {
    //              this.router.navigate(["login"]);
    //              resolve(false);
    //            })
    //       }
}
