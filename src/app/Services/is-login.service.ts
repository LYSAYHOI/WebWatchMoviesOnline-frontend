import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IsLoginService {

    public isLogin: boolean;
    private count: number;

    getisLogin(){
        return this.isLogin;
    }
    setisLogin(isLogin: boolean){
        this.isLogin = isLogin;
    }

    constructor() { }

    Login(value: boolean) {
        this.isLogin = value;
    }

    Count(value: number) {
        this.count = value;
    } 
}
