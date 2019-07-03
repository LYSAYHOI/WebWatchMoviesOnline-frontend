import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddGenreApiService } from '../../../Services/add-genre-api.service'
import { GetAllGenreApiService } from '../../../Services/get-all-genre-api.service'
import { EditGenreApiService } from '../../../Services/edit-genre-api.service'
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

export interface GetAllGenre {
    genreId: string;
    genreName: string;
    genreDescription: string;
}

@Component({
    selector: 'app-genre',
    templateUrl: './genre.component.html',
    styleUrls: ['./genre.component.css']
})

export class GenreComponent implements OnInit, OnDestroy, AfterViewInit {

    private subscription: Subscription;
    private ModifyActive: boolean = false;
    private genreDesciption: string;
    private genreName: string;
    private allGenre: any;
    private genreNameModify: string;
    private genreDesciptionModify: string;
    private idGenre: number;
    public frmAddGenre: FormGroup
    public frmModifyGenre: FormGroup

    dataSource = new MatTableDataSource<GetAllGenre>();
    displayedColumns = ['genreId', 'genreName', 'genreDescription', 'update'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private addGenreApiService: AddGenreApiService,
        private getAllGenreApiService: GetAllGenreApiService,
        private editGenreApiService: EditGenreApiService,
        private toastrService: ToastrService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.getAllGenre();
        this.createAddGenreForm();
        this.createModifyGenreForm();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    createAddGenreForm() {
        var genrepattern = /^[^`~!@#$%^&*()_+={}\[\]|\\;“’<>?๐฿]*$/;
        this.frmAddGenre = this.formBuilder.group({
            addGenreName: ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50),
                Validators.pattern(genrepattern)
            ]],
            addGenreDesciption: ['', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(500),
                Validators.pattern(genrepattern)
            ]]
        })
    }

    createModifyGenreForm() {
        var genrepattern = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]*$/;
        this.frmModifyGenre = this.formBuilder.group({
            modifyGenreName: ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50),
                Validators.pattern(genrepattern)
            ]],
            modifyGenreDesciption: ['', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(500),
                Validators.pattern(genrepattern)
            ]]
        })
    }

    onAddGenreSubmit() {
        console.log(this.frmAddGenre);
        if (this.frmAddGenre.valid) {
            let data = {
                genreName: this.genreName,
                genreDescription: this.genreDesciption
            }
            this.subscription = this.addGenreApiService.add(data).subscribe((response) => {
                this.getAllGenre();
                this.showSuccess();
                this.frmAddGenre.reset();
            }, (error) => {
                console.log(error);
            })
        }
    }

    onResetAddGenreForm() {
        this.frmAddGenre.reset();
    }

    getAllGenre() {
        this.subscription = this.getAllGenreApiService.AllGenre().subscribe((response) => {
            this.allGenre = response;
            this.dataSource.data = response as GetAllGenre[];
        }, (error) => {
            console.log(error);
        })
    }

    doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    getGenreInfo(name, desciption, id) {
        this.ModifyActive = true;
        this.idGenre = id;
        this.genreNameModify = name;
        this.genreDesciptionModify = desciption;
    }

    onModifyGenreSubmit() {
        if (this.frmModifyGenre.valid) {
            let data = {
                genreId: this.idGenre,
                genreName: this.genreNameModify,
                genreDescription: this.genreDesciptionModify
            }
            this.subscription = this.editGenreApiService.editGenre(data).subscribe((response) => {
                this.showSuccessModify();
                this.getAllGenre();
            }, (error) => {
                console.log(error);
            })
        }
    }

    DeActiveModify() {
        this.ModifyActive = false;
    }

    showSuccessModify() {
        this.toastrService.success('', 'Cập nhật thành công', {
            timeOut: 1000,
            positionClass: 'toast-top-right'
        });
    }

    showSuccess() {
        this.toastrService.success('', 'Thêm thành công', {
            timeOut: 1000,
            positionClass: 'toast-top-right'
        });
    }

    private isValidGenreName: boolean;

    onCheckGenreName(e) {
        // for (var i = 0; i < this.allGenre.length; i++) {
        //     if (this.allGenre[i]['genreName'].toLowerCase().toString() === e.target.value.toString()) {
        //         return this.isValidGenreName = true;
        //     }
        // }
        // return this.isValidGenreName = false;
        // console.log(this.isValidGenreName)
    }
}