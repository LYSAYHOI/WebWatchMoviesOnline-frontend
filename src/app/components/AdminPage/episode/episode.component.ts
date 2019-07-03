import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EpisodeService } from '../../../Services/episode.service';
import { Subscription } from 'rxjs';
import { UploadVideoService } from '../../../Services/upload-video.service';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { DialogModalService } from '../../../Services/dialog-modal.service';
import *  as tus from 'tus-js-client';
import { TouchSequence } from 'selenium-webdriver';

export interface EpisodeInfo {
    episodeId: string,
    episodeName: string,
    episodeNumber: number,
    date: Date,
    view: number,
    link: string
}

@Component({
    selector: 'app-episode',
    templateUrl: './episode.component.html',
    styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit, OnDestroy {
    
    private dataSource = new MatTableDataSource<EpisodeInfo>();
    private displayedColumns = ['episodeId', 'episodeName', 'episodeNumber', 'view', 'link', 'Config'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private episodeList: any;
    private subscription: Subscription;
    private progressBar = 0;
    private modifyEpStatus = false;
    private modifyEpId: number;
    private frmAddEp: FormGroup;
    private episodeName: string;
    private episodeNumber: string;
    private link: String = new String();
    private file: File;
    private isUploadProgressing: boolean = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public film: any,
        private episodeService: EpisodeService,
        private uploadVideoService: UploadVideoService,
        private formBuilder: FormBuilder,
        private dialog: DialogModalService
    ) { }

    ngOnInit() {
        this.getAllEp();
        this.createAddFilmForm();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.isUploadProgressing = false;
    }

    createAddFilmForm() {
        var filmpattern = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<>?๐฿]*$/;
        this.frmAddEp = this.formBuilder.group({
            addEpName: ['', [
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(filmpattern)
            ]],
            addEpNumber: ['', [
                Validators.required,
                Validators.min(0),
                Validators.pattern(filmpattern)
            ]],
        addEpLink: ['', []/*Validators.required*/]
        })
    }

    getAllEp() {
        this.subscription = this.episodeService.getAllEpisode(this.film.film.filmId).subscribe(
            (response)=>{
                this.episodeList = response;
                this.dataSource.data = response as EpisodeInfo[]
            }
        )
    }

    chooseFile(e){
        this.file = e.target.files[0];
    }

    uploadEpisode() {
        this.isUploadProgressing = true;
        this.uploadVideo(this.file);
    }

    addEpisode(){
        if(this.frmAddEp.valid){
            let data = {
                episodeName: this.episodeName,
                episodeNumber: this.episodeNumber,
                link: this.link,
                film: {
                    filmId: this.film.film.filmId
                }
            }
            this.subscription = this.episodeService.addEpisode(data).subscribe(
                (response)=>{
                    this.dialog.openDialog("success", "Add episode successfully");
                    this.getAllEp();
                }, (error) =>{
                    this.dialog.openDialog("error", error['error']['result']);
                }
            );
        }
    }

    episodeModifyClose(value) {
        this.modifyEpStatus = false;
        this.frmAddEp.reset();
        this.modifyEpId = null;
    }

    changeData(event) {
        // this.pageIndex = event.pageIndex;
        // this.pageSize = event.pageSize;

    }

    doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
    
//#region "region only for upload video"
    private uploadVideo(file) {
        this.subscription = this.uploadVideoService.getUploadUrl().subscribe((response)=>{
            console.log(response);
            this.performUpload(file, response['data'].url, response['data'].token);
        }, (error)=>{
            console.log(error);
        })
    }

    private performUpload(file, uploadUrl: string, uploadToken: string) {
        let uploadFile = file;
        //this.subscription.unsubscribe();
        let upload = new tus.Upload(uploadFile, {
            endpoint: uploadUrl,
            metadata: {
                token: uploadToken,
                name: uploadFile.name
            },
            onError: (error)=> {
                this.dialog.openDialog("Error", error);
                this.isUploadProgressing = false;
            },
            onSuccess: () => {
                let fingerprint = (upload.url).split("/")[4];
                this.dialog.openDialog("Success", "Upload success "+ fingerprint);
                this.subscription = this.uploadVideoService.getVideoId(fingerprint).subscribe((response)=>{
                    if(response['code'] == 200 && response['success'] == true) {
                        this.link = response['data'];
                    }else {
                        this.dialog.openDialog("error", response['data']);
                    }
                    this.isUploadProgressing = false;
                    if(this.progressBar == 100) {
                        this.progressBar = 0;
                    }
                }, (error) => {
                    this.dialog.openDialog("error", error);
                    this.isUploadProgressing = false;
                })
            },
            onProgress: (bytesUploaded, bytesTotal)=>{
                this.progressBar = parseFloat((bytesUploaded / bytesTotal * 100).toFixed(2));
                console.log(bytesUploaded, bytesTotal, this.progressBar + "%")
            }
        })
        upload.start();
    }

//#endregion "region only for upload video"

    modifyEpisode(episodeId, episodeName, episodeNumber, link) {
        this.modifyEpStatus = true;
        this.modifyEpId = episodeId;
        this.episodeName = episodeName;
        this.episodeNumber = episodeNumber;
        this.link = link;
    }

    performModify() {
        if(this.frmAddEp.valid){
            let data = {
                episodeId: this.modifyEpId,
                episodeName: this.episodeName,
                episodeNumber: this.episodeNumber,
                link: this.link,
                film: {
                    filmId: this.film.film.filmId
                }
            }
            this.subscription = this.episodeService.modifyEpisode(data).subscribe(
                (response) => {
                    this.getAllEp();
                    this.dialog.openDialog("Success", "Episode modified successfully");
                }, (error) => {
                    this.dialog.openDialog("Error", error);
                }
            );
        }
    }
}
