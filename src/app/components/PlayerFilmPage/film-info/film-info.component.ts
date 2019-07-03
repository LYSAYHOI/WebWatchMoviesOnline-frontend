import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmInfoService } from '../../../Services/film-info.service'
import { GetIdFilmService } from '../../../Services/get-id-film.service'
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { DialogModalService } from '../../../Services/dialog-modal.service';
import { CollectionApiServiceService } from '../../../Services/collection-api-service.service';
import decode from 'jwt-decode';

@Component({
    selector: 'app-film-info',
    templateUrl: './film-info.component.html',
    styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private listLikedFilm: any;
    constructor(
        private filmInfoService: FilmInfoService,
        private getIdFilmService: GetIdFilmService,
        private cookie: CookieService,
        private activateRouter: ActivatedRoute,
        private authServiceService: AuthServiceService,
        private dialog: DialogModalService,
        private collectionApiServiceService: CollectionApiServiceService
    ) { }

    ngOnInit() {
        this.setWatchFilmCookie();
        this.getAllLikedFilm();
    }

    ngOnDestroy() {
        if(this.subscription)
            this.subscription.unsubscribe();
    }

    setWatchFilmCookie() {
        let filmid = this.activateRouter.snapshot.paramMap.get("filmId");
        if (this.cookie.check("watchedfilm")) {
            let listwatched: any[] = JSON.parse(this.cookie.get("watchedfilm"));
            if (!this.isWatched(filmid, listwatched)) {
                listwatched.push(filmid);
                this.cookie.set("watchedfilm", JSON.stringify(listwatched));
            }
        } else {
            let listwatched: any[] = []
            listwatched.push(filmid);
            this.cookie.set("watchedfilm", JSON.stringify(listwatched));
        }
    }

    isWatched(id, list): boolean {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == id) {
                return true;
            }
        }
        return false;
    }

    likeFilm() {
        if (this.authServiceService.isAuthenticated()) {
            let data = {
                filmId: this.activateRouter.snapshot.paramMap.get("filmId")
            }
            this.subscription = this.filmInfoService.likeFilm(data).subscribe(
                (response) => {
                    this.filmInfoService.liked = response['viewcount'];
                    this.getAllLikedFilm();
                }, (error) => {
                    this.dialog.openDialog("error", error.message);
                }
            )
        } else {
            this.dialog.openDialog("error", "Please login in order to like film");
        }
    }

    getAllLikedFilm() {
        const token = decode(localStorage.getItem("token"));
        let data = {
            username: token.sub,
            pagesize: 100
        }
        this.subscription = this.collectionApiServiceService.getLikeFilm(data).subscribe((response) => {
            this.listLikedFilm = response;
            this.checkLikedFilm();
        }, (error) => {
            console.log(error);
        })
    }
    private check: boolean = false;
    checkLikedFilm() {
        let a = this.activateRouter.snapshot.paramMap.get("filmId")
        for (let i = 0; i < this.listLikedFilm.length; i++) {
            if(this.listLikedFilm[i].filmId == a)
                this.check = true;
        }
    }
}
