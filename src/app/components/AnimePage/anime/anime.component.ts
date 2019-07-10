import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetAllGenreApiService } from '../../../Services/get-all-genre-api.service';
import { Subscription } from 'rxjs';
import { FilmInfoService } from '../../../Services/film-info.service';
import { ActivatedRoute } from '@angular/router';
import { SlugPipe } from '../../Pipe/slug.pipe';

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css'],
    providers: [SlugPipe]
})
export class AnimeComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private allGenre: any[];
    private pagesize: number = 20;
    private genreId: number;
    private filmGenre: any;
    private filmLength: number;
    constructor(
        private getAllGenreApiService: GetAllGenreApiService,
        private filmInfoService: FilmInfoService,
        private activatedRoute: ActivatedRoute,
        private slugPipe: SlugPipe
    ) { }

    ngOnInit() {
        this.getAllGenre();
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    getAllGenre() {
        this.subscription = this.getAllGenreApiService.AllGenre().subscribe((response:any[]) => {
            this.allGenre = response;
            this.getAllFilmByGenre();
        }, (error) => {
            console.log(error);
        });
    }

    getAllFilmByGenre() {
        let Name = this.activatedRoute.snapshot.paramMap.get("genreName");
        for (let i = 0; i < this.allGenre.length; i++) {
            if (Name == this.slugPipe.transform(this.allGenre[i].genreName, 'slug')) {
                this.genreId = this.allGenre[i].genreId;
            }      
        }
        this.subscription = this.filmInfoService.getFilmByGenre(this.genreId, this.pagesize).subscribe((respone) => {
            this.filmGenre = respone;
            this.filmLength = this.filmGenre.length;
        }, (error) => {
            console.log(error)
        });
    }

    GetFilmWithGenre() {
        this.getAllGenre();
    }

    watchMore() {
        this.pagesize = this.pagesize + 8;
    }
}
