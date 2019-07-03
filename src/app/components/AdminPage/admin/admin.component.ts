import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { GetAllGenreApiService } from '../../../Services/get-all-genre-api.service';
import { DialogModalService } from '../../../Services/dialog-modal.service';
import { FilmAdminApiService } from '../../../Services/film-admin-api.service'

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    private hasChildren: boolean;
    private subscription: Subscription;
    private allGenre: any;
    private allFilm: any;
    private countTotalGenre: number;
    private countTotalfilm: number;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private router: Router, 
        private route:ActivatedRoute,
        private getAllGenreApiService: GetAllGenreApiService,
        private errorDialog : DialogModalService,
        private filmAdminApiService: FilmAdminApiService
    ) { }

    ngOnInit() {
        this.hasChildren = false;
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.hasChildren = this.route.children.length > 0;
        });
        this.getAllFilm();
        this.getAllGenre();
    }
    
    w3_open() {
        var mySidebar = document.getElementById("mySidebar");
        var overlayBg = document.getElementById("myOverlay");
        if (mySidebar.style.display === 'block') {
            mySidebar.style.display = 'none';
            overlayBg.style.display = "none";
        } else {
            mySidebar.style.display = 'block';
            overlayBg.style.display = "block";
        }
    }
    w3_close() {
        var mySidebar = document.getElementById("mySidebar");
        var overlayBg = document.getElementById("myOverlay");
        mySidebar.style.display = "none";
        overlayBg.style.display = "none";
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    getAllGenre() {
        this.subscription = this.getAllGenreApiService.AllGenre().subscribe((response) => {
            this.allGenre = response;
            this.countTotalGenre = this.allGenre.length;
        }, (error) => {
            console.log(error);
        })
    }

    getAllFilm() {
        this.subscription = this.filmAdminApiService.GetAllFilm(0, 1).subscribe((response) => {
            this.allFilm = response;
            this.countTotalfilm = this.allFilm.length;
        }, (error) => {
            console.log(error);
        })
    }

    openDashBoard() {
        this.getAllGenre();
        this.getAllFilm();
        this.router.navigate(['/admin']);
    }
}
