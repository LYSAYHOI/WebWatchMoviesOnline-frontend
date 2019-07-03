import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionApiServiceService } from './../../../Services/collection-api-service.service';
import { Subscription } from 'rxjs';
import { DialogModalService } from 'src/app/Services/dialog-modal.service';

@Component({
    selector: 'app-tray-movie',
    templateUrl: './tray-movie.component.html',
    styleUrls: ['./tray-movie.component.css']
})
export class TrayMovieComponent implements OnInit, OnDestroy{
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private subscription : Subscription;
    private listNewFilm : any;
    constructor(
            private collection : CollectionApiServiceService,
            private dialog : DialogModalService
    ) { }

    ngOnInit() {
        this.getNewFilm();
    }

    getNewFilm() {
        this.subscription = this.collection.getNewFilm().subscribe((response)=>{
            this.listNewFilm = response;
        }, (error) => {
            this.dialog.openDialog("error", error.message);
        })
    }
}
