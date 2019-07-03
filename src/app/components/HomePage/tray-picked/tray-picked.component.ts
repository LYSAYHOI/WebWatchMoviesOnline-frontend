import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionApiServiceService } from '../../../Services/collection-api-service.service';
import { Subscription } from 'rxjs';
import decode from 'jwt-decode';
import { IsLoginService } from '../../../Services/is-login.service';

@Component({
    selector: 'app-tray-picked',
    templateUrl: './tray-picked.component.html',
    styleUrls: ['./tray-picked.component.css']
})

export class TrayPickedComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private listlikedfilm: any;

    constructor(
        private collectionApiServiceService: CollectionApiServiceService,
        private isLoginService: IsLoginService
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
            pagesize: 8
        }
        this.subscription = this.collectionApiServiceService.getLikeFilm(data).subscribe((response) => {
            this.listlikedfilm = response;
        }, (error) => {
            console.log(error);
        })
    }
}
