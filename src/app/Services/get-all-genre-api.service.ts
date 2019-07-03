import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetAllGenreApiService {
    private gettAllGenreAPI: string = "http://localhost:8080/genre/all";
    constructor(
        private http: HttpClient
    ) { }

    AllGenre() {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.get(this.gettAllGenreAPI, {
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        });
    }
}
