import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FilmAdminApiService } from '../../../Services/film-admin-api.service'
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-watched-films',
    templateUrl: './user-watched-films.component.html',
    styleUrls: ['./user-watched-films.component.css']
})
export class UserWatchedFilmsComponent implements OnInit {

    private subscription: Subscription;
    private listFilm: any[] = [];
    constructor(
        private cookie: CookieService,
        private filmService: FilmAdminApiService
    ) { }

    ngOnInit() {
        this.getFilmFromCookie();
    }

    ngOnDestroy() {
        if(this.subscription)
            this.subscription.unsubscribe();
    }

    getFilmFromCookie() {
        if(this.cookie.check("watchedfilm")){
            let listfilmid: any[] = JSON.parse(this.cookie.get("watchedfilm"));
            for(let i=0; i < listfilmid.length; i++){
                this.getFilm(listfilmid[i]);
            }
        }
    }

    getFilm(filmId) {
        this.subscription = this.filmService.getFilm(filmId).subscribe(
            (response)=> {
                this.listFilm.push(response);
            }, (error)=> {
                console.log(error);
            }
        )
    }

}
