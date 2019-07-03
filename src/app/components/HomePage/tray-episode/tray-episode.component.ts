import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionApiServiceService } from './../../../Services/collection-api-service.service';
import { Subscription } from 'rxjs';
import { DialogModalService } from '../../../Services/dialog-modal.service';

@Component({
    selector: 'app-tray-episode',
    templateUrl: './tray-episode.component.html',
    styleUrls: ['./tray-episode.component.css']
})
export class TrayEpisodeComponent implements OnInit, OnDestroy {

    private subscription : Subscription;
    private listNewEp : any;

    constructor(
        private collection : CollectionApiServiceService,
        private dialog : DialogModalService
    ) { }

    ngOnInit() {
        this.getNewep();
    }

    ngOnDestroy() {
        if (this.subscription)
        this.subscription.unsubscribe();
    }

    getNewep() {
        this.subscription = this.collection.getNewEp().subscribe((response)=>{
            this.listNewEp = response;
        }, (error) => {
            this.dialog.openDialog("error", error.message);
        })
    }

    episodeImageThumbnail(videoID: string) {
        if(videoID == null || videoID == undefined || videoID == ""){
            return "";
        }
        return "https://www.fembed.com/asset/userdata/231885/poster/"+videoID.slice(0,1)+"/"+videoID.slice(1,3)+"/"+videoID+".png";
    }
}
