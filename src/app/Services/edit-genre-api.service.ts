import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EditGenreApiService {
    private editGenreAPI: string = "http://localhost:8080/genre/edit";
    constructor(
        private http: HttpClient
    ) { }

    editGenre(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.post(this.editGenreAPI, data, {
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        });
    }
}
