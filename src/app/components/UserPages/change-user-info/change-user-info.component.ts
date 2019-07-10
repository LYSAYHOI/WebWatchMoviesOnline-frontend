import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { LoginApiService } from '../../../Services/login-api.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-change-user-info',
    templateUrl: './change-user-info.component.html',
    styleUrls: ['./change-user-info.component.css'],
    providers: [DatePipe]
})
export class ChangeUserInfoComponent implements OnInit {

    private fullname: string;
    private email: string;
    private gender: boolean;
    private birthday: Date;
    private frmchangeInfo: FormGroup;
    
    constructor(
        private loginAPI: LoginApiService,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.createChangePasswordForm();
    }

    createChangePasswordForm() {
        this.frmchangeInfo = this.formBuilder.group({
            fullname: ['', [
                Validators.required
            ]],
            email: ['', [
                Validators.required
            ]],
            gender: ['', [
                Validators.required
            ]],
            birthday: ['', [
                Validators.required
            ]]
        })
    }

    changeInfo() {
        let data = {
            name: this.fullname,
            email: this.email,
            male: this.gender,
            birthday: this.datePipe.transform(this.birthday, "MM/dd/yyyy")
        }
        console.log(data);
        this.loginAPI.changeInfo(data).subscribe(
            (response) => {
                if(response["result"]=="success"){
                    this.showSuccess();
                }else console.log(response);
            }, (error) => {
                if(error.status==401){
                    this.showError();
                }else console.log(error);
            }
        )
    }

    showSuccess() {
        this.toastrService.success('', 'change information success', {
            timeOut: 1000,
            positionClass: 'toast-top-right'
        });
    }

    showError() {
        this.toastrService.error('', 'change information fail', {
            timeOut: 1000,
            positionClass: 'toast-top-right'
        });
    }

}
