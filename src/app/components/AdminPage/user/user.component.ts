import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface UserInfo {
    userId: number,
    username: string,
    name: string,
    email: string,
    birthday: Date,
    isBlocked: boolean
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

    constructor() { }

    ngOnInit() {
        this.dataSource.data = [
            {
                userId: 1,
                username: 'lshoi',
                name: 'SAY HOI',
                email: 'lshoi@gmail.com',
                birthday: new Date('1997-05-27'),
                isBlocked: true
            },
            {
                userId: 2,
                username: 'lhai',
                name: 'Hai',
                email: 'hai@gmail.com',
                birthday: new Date('1995-12-17'),
                isBlocked: false
            },
            {
                userId: 3,
                username: 'Trump',
                name: 'Donal Trump',
                email: 'trumpd@gmail.com',
                birthday: new Date('1985-12-17'),
                isBlocked: false
            }
        ] as UserInfo[];
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
}
