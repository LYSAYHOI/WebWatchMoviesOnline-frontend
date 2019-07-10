import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FilmInfoService {
    public filmId: number;
    public episodeCount: number;
    public filmName: string;
    public viewed: number;
    public liked: number;
    public filmDescription: string;
    public genre: any;
    
    private likeFilmAPI: string = "http://localhost:8080/like";
    private filmWithGenre: string = "http://localhost:8080/film/byGenre?";
    constructor(
        private http: HttpClient
    ) { }

    setFilmInfo (episodeCount?: number, filmId?: number, filmName?: string, viewed?: number, liked?: number, filmDescription?: string, genre?: any) {
        this.filmId = filmId;
        this.episodeCount = episodeCount;
        this.filmName = filmName;
        this.liked = liked;
        this.viewed = viewed;
        this.filmDescription = filmDescription;
        this.genre = genre;
    }

    likeFilm(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.get(this.likeFilmAPI, {
            params: data,
            headers: new HttpHeaders().set("Authorization", token.tokenType + ' ' + token.accessToken)
        })
    }
    getFilmByGenre(genreId, pagesize) {
        return this.http.get(this.filmWithGenre + "genreId=" + genreId + "&pagesize=" + pagesize);
    }
}
