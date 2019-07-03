import { Component, OnInit } from '@angular/core';
import { CollectionApiServiceService } from '../../../Services/collection-api-service.service';
import { DialogModalService } from '../../../Services/dialog-modal.service';

@Component({
    selector: 'app-tray-ranking',
    templateUrl: './tray-ranking.component.html',
    styleUrls: ['./tray-ranking.component.css']
})
export class TrayRankingComponent implements OnInit {

    private rankingFilmList;
    constructor(
        private collectionService: CollectionApiServiceService,
        private dialog: DialogModalService
    ) { }

    ngOnInit() {
        this.getRanking();
    }

    getRanking() {
        let data = {
            pagesize: 10
        }
        this.collectionService.getRanking(data).subscribe(
            response => {
                this.rankingFilmList = response;
            },error => {
                this.dialog.openDialog("Error", error.message);
            }
        )
    }

}
