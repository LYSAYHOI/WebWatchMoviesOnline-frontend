import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionApiServiceService } from '../../../Services/collection-api-service.service';
import decode from 'jwt-decode';

@Component({
    selector: 'app-user-liked-films',
    templateUrl: './user-liked-films.component.html',
    styleUrls: ['./user-liked-films.component.css']
})

export class UserLikedFilmsComponent implements OnInit, OnDestroy {
 
    private subscription: Subscription;
    private listlikedfilm: any;
    private pagesize: number = 40;
    private totalLikedFilm: number;
    constructor(
        private collectionApiServiceService: CollectionApiServiceService
    ) { }

    ngOnInit() {
        this.getAllLikedFilm();
    }

    ngOnDestroy() {
        if (this.subscription)
        this.subscription.unsubscribe();
    }

    getAllLikedFilm() {
        const token = decode(localStorage.getItem("token"));
        let data = {
            pagesize: this.pagesize
        }
        this.subscription = this.collectionApiServiceService.getLikeFilm(data).subscribe((response) => {
            this.listlikedfilm = response;
            this.totalLikedFilm = this.listlikedfilm.length;
        }, (error) => {
            console.log(error);
        })
    }

    readMore() {
        this.pagesize = this.pagesize + 10;
        this.getAllLikedFilm();
    }
}
