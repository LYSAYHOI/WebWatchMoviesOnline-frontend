import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class LoginApiService {
    private loginAPI: string = "http://localhost:8080/login";

    constructor(
        private http: HttpClient
    ) { }


    login(data) {
        return this.http.post(this.loginAPI, data);
    }
}
