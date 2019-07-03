import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http'
import { FilmAdminApiService } from '../../../Services/film-admin-api.service'
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { GetAllGenreApiService } from '../../../Services/get-all-genre-api.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { EpisodeComponent } from '../../AdminPage/episode/episode.component'
import { DialogModalService } from '../../../Services/dialog-modal.service';

export interface AllFilmInfo {
    filmId: string;
    filmName: string;
    filmDescription: Date;
    viewed: number;
    liked: number;
    genre: Array<object>
    filmImageLink: string;
}

@Component({
    selector: 'app-film',
    templateUrl: './film.component.html',
    styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit, OnDestroy, AfterViewInit {

    dataSource = new MatTableDataSource<AllFilmInfo>();
    displayedColumns = ['filmId', 'filmName', 'filmDescription', 'viewed', 'liked', 'genre', 'filmImageLink', 'Config'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('fileInput') myInputVariable: ElementRef;
    private code: string;
    private subscription: Subscription;
    private TokenArray: any;
    private Token: string;
    private selectedfile: File = null;
    private urlupload: string;
    private allGenreInfo: any;
    private genreOfFilm: any;
    private filmName: string;
    private filmDesciption: string;
    private filmGenre: string;
    toppings = new FormControl();
    toppingList: any[];
    toppingList1: any[];
    public frmAddFilm: FormGroup;
    public frmModifyFilm: FormGroup;
    private filmNameModify: string;
    private filmDesciptionModify: string;
    private pageSize: number = 5;
    private length: number;
    private pageIndex: number = 0;
    @Output("hasChildren") hasChildrenHandle = new EventEmitter<boolean>();

    constructor(
        private filmAdminApiService: FilmAdminApiService,
        private getAllGenreApiService: GetAllGenreApiService,
        private toastrService: ToastrService,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private errorDialog: DialogModalService
    ) { }

    ngOnInit() {
        this.hasChildrenHandle.emit(true);
        this.getAllFilm();
        this.getAllGenre();
        this.createAddFilmForm();
        this.createModifyFilmForm();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy() {
        this.hasChildrenHandle.emit(false);
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    createModifyFilmForm() {
        var filmpattern = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<>?๐฿]*$/;
        this.frmModifyFilm = this.formBuilder.group({
            modifyFilmName: ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50),
                Validators.pattern(filmpattern)
            ]],
            modifyFilmDesciption: ['', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(5000),
                Validators.pattern(filmpattern)
            ]],
            modifyGenreForFilm: ['', Validators.required],
            addEpLinkModify: ['', Validators.required]
        })
    }

    createAddFilmForm() {
        var filmpattern = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<>?๐฿]*$/;
        this.frmAddFilm = this.formBuilder.group({
            addFilmName: ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50),
                Validators.pattern(filmpattern)
            ]],
            addFilmDesciption: ['', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(5000),
                Validators.pattern(filmpattern)
            ]],
            addGenreForFilm: ['', Validators.required],
            addEpLink: ['', Validators.required]
        })
    }

    getAllFilm() {
        this.subscription = this.filmAdminApiService.GetAllFilm(this.pageIndex, this.pageSize).subscribe((response) => {
            this.dataSource.data = response['film'] as AllFilmInfo[];
            this.genreOfFilm = response['film'];
            this.length = response['length'];
        }, (error) => {
            this.errorDialog.openDialog("error", error.message);
        })
    }

    getAllGenre() {
        this.subscription = this.getAllGenreApiService.AllGenre().subscribe((response) => {
            this.allGenreInfo = response;
            this.toppingList = this.allGenreInfo;
        }, (error) => {
            this.errorDialog.openDialog("error", error.message);
        })
    }

    private genreSelectedValue: any;

    genreSelect(e) {
        this.genreSelectedValue = e
    }

    filmSubmit() {
        if (this.frmAddFilm.valid) {
            var array = [];
            for (let i = 0; i < this.genreSelectedValue.length; i++) {
                var genreArray = {
                    genreId: this.genreSelectedValue[i]
                }
                array.push(genreArray)
            }
            let data = {
                filmName: this.filmName,
                filmDescription: this.filmDesciption,
                image: this.imageLink,
                genre: array
            }
            this.subscription = this.filmAdminApiService.AddFilm(data).subscribe((response) => {
                this.showSuccess();
                this.getAllFilm();
                this.frmAddFilm.reset();
            }, (error) => {
                this.errorDialog.openDialog("error", error.message);
            })
        }
    }

    private genreModifySelectedValue: any;

    genreModifySelect(e) {
        this.genreModifySelectedValue = e;
        console.log(this.genreModifySelectedValue);
    }

    filmModifySubmit() {
        if (this.frmModifyFilm.valid) {
            console.log(this.genreModifySelectedValue);
            var arrayModify = [];
            for (let i = 0; i < this.genreModifySelectedValue.length; i++) {
                var genreArray = {
                    genreId: this.genreModifySelectedValue[i].genreId
                }
                arrayModify.push(genreArray)
            }
            let data = {
                filmId: this.filmIdForModify.toString(),
                filmName: this.filmNameModify,
                filmDescription: this.filmDesciptionModify,
                image: this.imageLinkModify,
                genre: arrayModify
            }
            this.subscription = this.filmAdminApiService.ModifyFilm(data).subscribe((response) => {
                this.showModifySuccess();
                this.getAllFilm();
            }, (error) => {
                this.errorDialog.openDialog("error", error.error.result);
            })
        }
    }

    onReset() {
        this.frmAddFilm.reset();
    }

    showSuccess() {
        this.toastrService.success('', 'Thêm thành công', {
            timeOut: 1000,
            positionClass: 'toast-top-right'
        });
    }

    showModifySuccess() {
        this.toastrService.success('', 'Sửa thành công', {
            timeOut: 1000,
            positionClass: 'toast-top-right'
        });
    }

    private activeModifyFilm: boolean = false;
    private filmIdForModify: any;
    
    ActiveModifyFilm(filmId, filmName, filmDes, filmGenre, image) {
        this.activeModifyFilm = true;
        this.filmIdForModify = filmId;
        this.filmNameModify = filmName;
        this.filmDesciptionModify = filmDes;
        this.toppingList1 = filmGenre;
        this.imageLinkModify = image;
        this.myInputVariable.nativeElement.value = '';
    }

    compareObjects(o1: any, o2: any): boolean {
        return o1.genreId === o2.genreId;
    }

    filmModifyClose() {
        this.activeModifyFilm = false;
    }

    doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    private file: File;
    chooseFile(e) {
        this.file = e.target.files[0];
    }

    private isUploadProgressing: boolean = false;
    uploadImageFilm() {
        this.isUploadProgressing = true;
        this.uploadImageToHost();
    }

    private imageLink: string;
    private getRespone: any;
    private progressBar: number = 0;

    private uploadImageToHost() {
        const uploaddata = new FormData();
        uploaddata.append('image', this.file, this.file.name);
        this.subscription = this.filmAdminApiService.uploadImage(uploaddata).subscribe(response => {
            if (response.type === HttpEventType.UploadProgress) {
                this.progressBar = parseFloat((response.loaded / response.total * 100).toFixed(2));
            } else if (response.type === HttpEventType.Response) {
                this.progressBar = 0;
                this.errorDialog.openDialog("Info","Upload image success");
                this.myInputVariable.nativeElement.value = '';
                this.getRespone = response;
                this.imageLink = this.getRespone.body.data.url;
            }
        }, (error) => {
            this.errorDialog.openDialog("error", error.message);
        })
    }

    uploadImageFilmModify() {
        this.isUploadProgressing = true;
        this.uploadImageToHostModify();
    }

    private imageLinkModify: string;
    private getResponeModify: any;
    private progressBarModify: number = 0;

    private uploadImageToHostModify() {
        const uploaddata = new FormData();
        uploaddata.append('image', this.file, this.file.name);
        this.subscription = this.filmAdminApiService.uploadImage(uploaddata).subscribe(response => {
            if (response.type === HttpEventType.UploadProgress) {
                this.progressBarModify = parseFloat((response.loaded / response.total * 100).toFixed(2));
            } else if (response.type === HttpEventType.Response) {
                this.progressBarModify = 0;
                this.errorDialog.openDialog("Info","Upload image success");
                this.isUploadProgressing = false;
                this.myInputVariable.nativeElement.value = '';
                this.getResponeModify = response;
                this.imageLinkModify = this.getResponeModify.body.data.url;
            }
        }, (error) => {
            this.errorDialog.openDialog("error", error.message);
        })
    }

    openEpisodeDialog(element) {
        this.myInputVariable.nativeElement.value = '';
        this.dialog.open(EpisodeComponent, {
            width: "80%",
            data: {
                film: element
            },
            autoFocus: false,
            disableClose: true
        });

    }
    changeData(event) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getAllFilm();
    }

}
