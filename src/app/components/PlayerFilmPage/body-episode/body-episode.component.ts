import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerSidebarServiceService } from '../../../Services/player-sidebar-service.service';
import { CallApiService } from './../../../Services/call-api.service';
import { Subscription } from 'rxjs';
import { FilmInfoService } from '../../../Services/film-info.service'
import { GetIdFilmService } from '../../../Services/get-id-film.service'
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModalService } from '../../../Services/dialog-modal.service';

@Component({
    selector: 'app-body-episode',
    templateUrl: './body-episode.component.html',
    styleUrls: ['./body-episode.component.css']
})
export class BodyEpisodeComponent implements OnInit, OnDestroy {
    private episodeSelected: number
    private subscription: Subscription
    private episode: any;
    public numberInput: number;
    private filmNumber: any;
    private filmNumberFull: any;
    private filmNameFull: any;
    private filmId:any
    constructor(
        private PlayerSidebarServiceService: PlayerSidebarServiceService,
        private callApiService: CallApiService,
        private filmInfoService: FilmInfoService,
        private getIdFilmService: GetIdFilmService,
        private activateRouter: ActivatedRoute,
        private router: Router,
        private dialog: DialogModalService
    ) { }

    ngOnInit() {
        this.getEpisode();
        this.getParamUrl();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getEpisode() {
        //console.log(this.activateRouter.snapshot.paramMap.get("filmId"));
        let data = {
            filmId: this.activateRouter.snapshot.paramMap.get("filmId")
        }
        this.subscription = this.callApiService.getEpisode(data).subscribe(
            (Response) => {
                this.episode = Response;
                this.filmInfoService.setFilmInfo(this.episode.length, this.episode[0].film.filmId, (this.episode[0].film.filmName).toString(), Number(this.episode[0].film.viewed), Number(this.episode[0].film.liked), this.episode[0].film.filmDescription, this.episode[0].film.genre);
                if(this.episode.length > 0){
                    this.getIdFilmService.setEpNumber(Number(this.episode[0].episodeNumber));
                    this.getIdFilmService.setIdLink(this.episode[0].link);
                }
            },
            (error) => {
                console.log("fail");
                console.log(error);
            }
        )
    }

    episodeImageThumbnail(videoID: string) {
        if(videoID == null || videoID == undefined || videoID == ""){
            return "";
        }
        return "https://www.fembed.com/asset/userdata/231885/poster/"+videoID.slice(0,1)+"/"+videoID.slice(1,3)+"/"+videoID+".png";
        //return "https://www.fembed.com/asset/userdata/231885/poster/6/0r/60rmyh0623e-mx4.png?v=1561663673";
    }

    getIdLink(epispdeId, value, epnum) {
        this.filmNumber = -99;
        this.router.navigate(['/phim' + '/' + this.filmId + '/' + this.filmNameFull + '/tap-' + epnum])
        this.getIdFilmService.setIdLink(value);
        this.episodeSelected = epnum;
        this.getIdFilmService.setEpNumber(epnum);
        this.addView(epispdeId, epnum);
    }

    onPlay(numberInput: number) {
        if(numberInput > this.episode.length)
        {
            this.dialog.openDialog("Warning", "Episode Not Found!!!")
        } else {
            this.filmNumber = -99;
            this.router.navigate(['/phim' + '/' + this.filmId + '/' + this.filmNameFull + '/tap-' + numberInput])
            this.episodeSelected = numberInput;
            let episodeFound = this.findEpisode(numberInput);
            this.getIdFilmService.setIdLink(episodeFound.link);
            this.getIdFilmService.setEpNumber(numberInput);
        }   
    }

    findEpisode(epNumber: number) {
        for(let i of this.episode){
            if(i.episodeNumber == epNumber){
                return i;
            }
        }
    }

    getParamUrl() {
        this.filmNumber = this.activateRouter.snapshot.paramMap.get("filmNumber").slice(4,5);
        this.episodeSelected = this.filmNumber;
        this.filmNumberFull = this.activateRouter.snapshot.paramMap.get("filmNumber");
        this.filmNameFull = this.activateRouter.snapshot.paramMap.get("filmName");
        this.filmId = this.activateRouter.snapshot.paramMap.get("filmId");
    }

    private addView(episodeId, episodeIndex) {
        let data = {
            episodeId: episodeId
        };
        this.subscription = this.callApiService.addViewEpisode(data).subscribe(
            (response)=>{
                this.episode[episodeIndex-1]['view'] = response['viewcount'];
            },(error) => {
                if(error.error.result != null ||error.error.result != undefined){
                    this.dialog.openDialog("error", error.error.result);
                }
                else this.dialog.openDialog("error", error.message);
            }
        )
    }

}