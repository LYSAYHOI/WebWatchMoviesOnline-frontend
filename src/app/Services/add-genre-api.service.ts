import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AddGenreApiService {
    private addGenreAPI: string = "http://localhost:8080/genre/add";
    constructor(
        private http: HttpClient
    ) { }

    add(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.post(this.addGenreAPI, data, {
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        });
    }
}
