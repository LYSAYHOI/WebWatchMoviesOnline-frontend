import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FilmAdminApiService {
    private gettAllFilmAPI: string = "http://localhost:8080/film/getall";
    private addFilmAPI: string = "http://localhost:8080/film/add";
    private modifyFilmAPI: string = "http://localhost:8080/film/edit";
    private getFilmAPI: string = "http://localhost:8080/film/get";
    private uploadImageAPI: string = "https://api.imgbb.com/1/upload?key=";
    private imgbb_key_API: string = "0a0328a64cebc2ca972e2ee0135df477";
    constructor(
        private http: HttpClient
    ) { }

    GetAllFilm(pageNumber, pageSize) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        let params = {
            pageNumber: pageNumber,
            pageSize: pageSize
        }
        return this.http.get(this.gettAllFilmAPI, {
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken), 
            params: params
        });
    }

    AddFilm(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.post(this.addFilmAPI, data, {
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        });
    }

    ModifyFilm(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.post(this.modifyFilmAPI, data, {
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        });
    }

    getFilm(data) {
        return this.http.get(this.getFilmAPI, {
            params: { filmId: data }
        });
    }

    uploadImage(data) {
        return this.http.post(this.uploadImageAPI + this.imgbb_key_API, data, {
            reportProgress: true,
            observe: 'events'
        });
    }
}
