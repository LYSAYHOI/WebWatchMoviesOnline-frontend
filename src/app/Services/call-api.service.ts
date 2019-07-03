import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CallApiService {
    private getAllEpisodeAPI: string = 'http://localhost:8080/episode';
    private addViewAPI: string = 'http://localhost:8080/addEpisodeView';

    constructor(
        public http: HttpClient
    ) { }

    getEpisode(data){
         return this.http.post(this.getAllEpisodeAPI, data)
    }

    addViewEpisode(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.get(this.addViewAPI, {
            params: data
        })
    }
}