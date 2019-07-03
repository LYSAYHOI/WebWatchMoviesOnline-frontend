import { Component, OnInit } from '@angular/core';
import { NavbarServiceService } from '../../../Services/navbar-service.service'
@Component({
    selector: 'app-navbar-left',
    templateUrl: './navbar-left.component.html',
    styleUrls: ['./navbar-left.component.css']
})
export class NavbarLeftComponent implements OnInit {

    constructor(
        private _MenuToggle : NavbarServiceService
    ) { }

    ngOnInit() {
    }
    
    CloseNavbarToggle() {
        this._MenuToggle.ChangeMenuToggle(false)
    }
}
