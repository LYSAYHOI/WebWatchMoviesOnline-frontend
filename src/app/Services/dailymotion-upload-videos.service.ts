import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DailymotionUploadVideosService {
    private getOauthToken: string = "https://api.dailymotion.com/oauth/token";
    private getUrlFileUpload: string = 'https://api.dailymotion.com/file/upload';
    private createVideo: string = 'https://api.dailymotion.com/me/videos';
    private publicVideo: string = 'https://api.dailymotion.com/video/';

    constructor(
        private http: HttpClient
    ) { }

    OauthToken(data) {
        return this.http.post(this.getOauthToken, data, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
    }

    UrlFileUpload(token: string) {
        return this.http.get(this.getUrlFileUpload, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        });
    }

    UpLoadVideo(urlapi, data) {
        return this.http.post(urlapi, data, { reportProgress: true, observe: 'events' });
    }

    CreateVideo(data, token) {
        return this.http.post(this.createVideo, data, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        });
    }

    PublicVideo(id, data, token) {
        console.log(this.publicVideo + id)
        return this.http.post(this.publicVideo + id, data, {
            headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token})
        });
    }
}
