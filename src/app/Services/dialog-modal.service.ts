import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogModalService {

    constructor(
        private dialog : MatDialog
    ) { }

    openDialog(title: string, message: string) {
        return this.dialog.open(AlertDialogComponent, {
            width: "500px",
            data : {
                title: title,
                message: message
            }
        })
    }
}
