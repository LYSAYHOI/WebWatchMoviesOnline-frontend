import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignUpApiService {
    private signupAPI: string = "http://localhost:8080/signup";

    constructor(
        private http: HttpClient
    ) { }

    singup(data) {
        return this.http.post(this.signupAPI, data);
    }
}
