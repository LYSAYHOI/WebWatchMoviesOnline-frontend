import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetAllGenreApiService } from '../../../Services/get-all-genre-api.service';
import { DialogModalService } from '../../../Services/dialog-modal.service';

@Component({
    selector: 'app-dash-board',
    templateUrl: './dash-board.component.html',
    styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private allGenre: any;
    private countTotalGenre: number;
    constructor(
        private getAllGenreApiService: GetAllGenreApiService,
        private errorDialog : DialogModalService
    ) { }

    ngOnInit() {
        this.getAllGenre();
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    getAllGenre() {
        this.subscription = this.getAllGenreApiService.AllGenre().subscribe((response) => {
            this.allGenre = response;
            this.countTotalGenre = this.allGenre.length;
            console.log("sadasdsadasdasdsads")
            console.log(this.countTotalGenre)
        }, (error) => {
            console.log(error);
        })
    }

    // getAllFilm() {
    //     this.subscription = this.filmAdminApiService.GetAllFilm(this.pageIndex, this.pageSize).subscribe((response) => {

    //     }, (error) => {
    //         this.errorDialog.openDialog("error", error.message);
    //     })
    // }
}
