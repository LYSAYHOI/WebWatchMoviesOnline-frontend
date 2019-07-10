import { Component, OnInit } from '@angular/core';
import { LoginApiService } from '../../../Services/login-api.service'
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-change-user-password',
    templateUrl: './change-user-password.component.html',
    styleUrls: ['./change-user-password.component.css']
})
export class ChangeUserPasswordComponent implements OnInit {

    private oldPassword: string;
    private newPassword: string;
    private newConfirmedPassword: string;
    private frmChangePassword: FormGroup

    constructor(
        private loginAPI: LoginApiService,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
    ) { }

    ngOnInit() {
        this.createChangePasswordForm();
    }

    
    createChangePasswordForm() {
        var filmpattern = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<>?๐฿]*$/;
        this.frmChangePassword = this.formBuilder.group({
            fcoldPassword: ['', [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(30),
                Validators.pattern(filmpattern)
            ]],
            fcnewPassword: ['', [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(30),
                Validators.pattern(filmpattern)
            ]],
            fcnnewConfirmedPassword: ['', [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(30),
                Validators.pattern(filmpattern)
            ]]
        })
    }

    isNewPasswordMatch(newPassword: string): boolean {
        if(this.newPassword == "" || this.newPassword == null || this.newPassword == undefined){
            return false;
        }
        return (this.newPassword == this.newConfirmedPassword) ? true:false;
    }

    changePassword() {
        let data = {
            newPassword: this.newPassword,
            oldPassword: this.oldPassword
        }
        this.loginAPI.changePassword(data).subscribe(
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
        this.toastrService.success('', 'change password success', {
            timeOut: 1000,
            positionClass: 'toast-top-right'
        });
    }

    showError() {
        this.toastrService.error('', 'change password fail', {
            timeOut: 1000,
            positionClass: 'toast-top-right'
        });
    }

}
