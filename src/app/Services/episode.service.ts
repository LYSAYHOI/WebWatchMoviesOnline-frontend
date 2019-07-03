import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthServiceService } from '../Services/auth-service.service';
import { DialogModalService } from '../Services/dialog-modal.service';

@Injectable({
    providedIn: 'root'
})
export class EpisodeService {

    private getEpisodeOfAFilm: string = "http://localhost:8080/episode";
    private addEpisodeAPI: string = "http://localhost:8080/add-episode"
    private editEpisodeAPI: string = "http://localhost:8080/edit-episode"

    constructor(
        private http: HttpClient,
        private authServiceService: AuthServiceService,
        private dialog: DialogModalService
    ) { }

    getAllEpisode(filmId) {
        let data = {
            filmId: filmId
        }
        return this.http.post(this.getEpisodeOfAFilm, data);
    }

    addEpisode(data) {
        if(this.authServiceService.isAuthenticated() && this.authServiceService.checkRole("ADMIN")){
            let token = JSON.parse(localStorage.getItem("token"));
            return this.http.post(this.addEpisodeAPI, data, {
                headers: new HttpHeaders()
                    .set("Authorization", token.tokenType +" "+ token.accessToken),
                observe: 'response'
            })
        }else {
            this.dialog.openDialog("Error", "Fobbident");
        }
    }

    modifyEpisode(data) {
        if(this.authServiceService.isAuthenticated() && this.authServiceService.checkRole("ADMIN")){
            let token = JSON.parse(localStorage.getItem("token"));
            return this.http.post(this.editEpisodeAPI, data, {
                headers: new HttpHeaders()
                    .set("Authorization", token.tokenType +" "+ token.accessToken),
                observe: 'response'
            })
        }else {
            this.dialog.openDialog("Error", "Fobbident");
        } 
    }
}
