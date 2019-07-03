import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PlayerSidebarServiceService {
    private toggle: boolean = true;

    constructor() { }

    onToggle() {
        this.toggle = !this.toggle
    }
}
