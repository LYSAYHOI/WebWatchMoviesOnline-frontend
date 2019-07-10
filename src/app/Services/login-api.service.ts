import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class LoginApiService {
    private loginAPI: string = "http://localhost:8080/login";
    private getAllUserAPI = "http://localhost:8080/getalluser";
    private blockUserAPI = "http://localhost:8080/blockuser";
    private changePasswordAPI = "http://localhost:8080/changepassword";
    private changeInfoAPI = "http://localhost:8080/changeinfo";

    constructor(
        private http: HttpClient
    ) { }


    login(data) {
        return this.http.post(this.loginAPI, data);
    }

    getAllUser(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.get(this.getAllUserAPI, {
            params: data,
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        })
    }

    blockuser(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.get(this.blockUserAPI, {
            params: data,
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        })
    }

    changePassword(data) {
        let token: any = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")): [];
        return this.http.post(this.changePasswordAPI, data, {
            headers: new HttpHeaders().set("Authorization", token.tokenType + " " + token.accessToken)
        })
    }

    changeInfo(data) {
        let token: any = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")): [];
        return this.http.post(this.changeInfoAPI, data, {
            headers: new HttpHeaders().set("Authorization", token.tokenType + " " + token.accessToken)
        }) 
    }
}
