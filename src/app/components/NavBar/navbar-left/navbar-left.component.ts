import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarServiceService } from '../../../Services/navbar-service.service';
import { GetAllGenreApiService } from '../../../Services/get-all-genre-api.service';
import { Subscription } from 'rxjs';
import { SlugPipe } from '../../Pipe/slug.pipe';
import { Router } from "@angular/router";

@Component({
    selector: 'app-navbar-left',
    templateUrl: './navbar-left.component.html',
    styleUrls: ['./navbar-left.component.css'],
    providers: [SlugPipe]
})
export class NavbarLeftComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private firstGenre: any;
    private keyword: string = "";
    constructor(
        private _MenuToggle: NavbarServiceService,
        private getAllGenreApiService: GetAllGenreApiService,
        private slugPipe: SlugPipe,
        private route: Router
    ) { }

    ngOnInit() {
        this.getAllGenre();
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    CloseNavbarToggle() {
        this._MenuToggle.ChangeMenuToggle(false);
    }

    getAllGenre() {
        this.subscription = this.getAllGenreApiService.AllGenre().subscribe((response: any[]) => {
            if(response.length > 0){
                this.firstGenre = this.slugPipe.transform(response[0].genreName, 'slug');
            }
        }, (error) => {
            console.log(error);
        });
    }

    search() {
        this.route.navigate(["/search", this.keyword]);
        this.keyword = "";
    }
}
