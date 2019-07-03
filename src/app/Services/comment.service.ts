import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    private getCommentAPI = "http://localhost:8080/getcomment";
    private addCommentAPI = "http://localhost:8080/comment";
    constructor(
        private http: HttpClient
    ) { }

    getComment(data) {
        return this.http.get(this.getCommentAPI, {
            params: data
        })
    }

    addComment(data) {
        var token: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : [];
        return this.http.post(this.addCommentAPI, data, {
            headers: new HttpHeaders().set('Authorization', token.tokenType + ' ' + token.accessToken)
        })
    }
}
