import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionApiServiceService } from 'src/app/Services/collection-api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

    private listFilm;
    private subscription: Subscription;
    private keyword: String = this.activateRouter.snapshot.paramMap.get("keyword");

    constructor(
        private collection: CollectionApiServiceService,
        private activateRouter: ActivatedRoute
    ) { }

    ngOnInit() {
        this.paramChange();
        //this.getFilm();
    }

    getFilm() {
        if(this.keyword == ""){
            return;
        }
        let data = {
            keyword: this.keyword
        }
        this.subscription = this.collection.getSearch(data).subscribe(
            (response)=> {
                this.listFilm = response;
            }, (error) => {
                console.log(error);
            }
        )
    }

    paramChange() {
        this.activateRouter.params.subscribe(params => {
            this.keyword = params['keyword'];
            this.getFilm();
        });
    }

}
