import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CollectionApiServiceService {

    private getNewFilmAPI : string = "http://localhost:8080/newfilm";
    private getNewEpAPI : string = "http://localhost:8080/newepisode";
    private getAllLikedAPI: string = "http://localhost:8080/likedFilm";
    private getRankingdAPI: string = "http://localhost:8080/ranking";
    private getSearchdAPI: string = "http://localhost:8080/search";

    constructor(
        private http : HttpClient
    ) { }

    getNewFilm() {
        return this.http.get(this.getNewFilmAPI);
    }
    
    getNewEp() {
        return this.http.get(this.getNewEpAPI);
    }
    
    getLikeFilm(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.get(this.getAllLikedAPI, {
            params: data,
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        });
    }

    getRanking(data) {
        return this.http.get(this.getRankingdAPI, {
            params: data
        });
    }

    getSearch(data) {
        return this.http.get(this.getSearchdAPI, {
            params: data
        });
    }
}
