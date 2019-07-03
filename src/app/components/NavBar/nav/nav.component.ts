import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { NavbarServiceService } from '../../../Services/navbar-service.service'
import { DOCUMENT } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    windowScrolled: boolean;

    constructor(
        private _UserLogingTabService: NavbarServiceService,
        @Inject(DOCUMENT) private document: Document,
        private router: Router
    ) { }

    @HostListener("window:scroll", [])

    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }
    ngOnInit() {
    }

    onClickUserLogin() {
        this._UserLogingTabService.ChangeStatus(true)
        this._UserLogingTabService.ChangeMenuToggle(false)
        this._UserLogingTabService.ToggleFloatingAction()
    }

    onClickMenuToggle() {
        this._UserLogingTabService.ChangeMenuToggle(true)
        this._UserLogingTabService.ChangeStatus(false)
        this._UserLogingTabService.ToggleFloatingAction()
    }

    onActiveFloatingAction() {
        this._UserLogingTabService.ToggleFloatingAction()
        this._UserLogingTabService.ChangeMenuToggle(false)
        this._UserLogingTabService.ChangeStatus(false)
    }

    backtoHome() {
        this.router.navigate([""]);
    }
}
