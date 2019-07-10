import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LoginApiService } from 'src/app/Services/login-api.service';

export interface UserInfo {
    userId: number,
    username: string,
    name: string,
    email: string,
    birthday: Date,
    blocked: boolean
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit, AfterViewInit {

    private dataSource = new MatTableDataSource<UserInfo>();
    private displayedColumns = ['userId', 'username', 'name', 'email', 'birthday', 'is_blocked', 'block'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private userService: LoginApiService
    ) { }

    ngOnInit() {
        // this.dataSource.data = [
        //     {
        //         userId: 1,
        //         username: 'lshoi',
        //         name: 'SAY HOI',
        //         email: 'lshoi@gmail.com',
        //         birthday: new Date('1997-05-27'),
        //         isBlocked: true
        //     },
        //     {
        //         userId: 2,
        //         username: 'lhai',
        //         name: 'Hai',
        //         email: 'hai@gmail.com',
        //         birthday: new Date('1995-12-17'),
        //         isBlocked: false
        //     },
        //     {
        //         userId: 3,
        //         username: 'Trump',
        //         name: 'Donal Trump',
        //         email: 'trumpd@gmail.com',
        //         birthday: new Date('1985-12-17'),
        //         isBlocked: false
        //     }
        // ] as UserInfo[];

        this.getAllUser();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    getAllUser() {
        let data = {
            pagesize: 10,
            pageindex: 0
        }
        this.userService.getAllUser(data).subscribe(
            (response) => {
                this.dataSource.data = response as UserInfo[];
            },(error) => {
                console.log(error);
            }
        )
    }

    blockUser(username) {
        let data = {
            username: username
        }
        this.userService.blockuser(data).subscribe(
            (response) => {
                this.getAllUser()
            },(error) => {
                console.log(error);
            }
        )
    }
}
