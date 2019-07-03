import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavbarServiceService {

    private status: boolean = false;
    private menuToggle: boolean = false;
    private floatingAction: boolean = false;

    constructor() { }

    ChangeStatus(value: boolean) {
        value === true ? this.status = true : this.status = false
    }

    ChangeMenuToggle(value: boolean) {
        value === true ? this.menuToggle = true : this.menuToggle = false
    }

    ToggleFloatingAction() {
        this.status === true || this.menuToggle === true ? this.floatingAction = false : this.floatingAction = !this.floatingAction
    }
}
