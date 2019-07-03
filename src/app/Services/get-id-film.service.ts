import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GetIdFilmService {
    public idlink: string;
    public epnumber: number;

    constructor() { }

    setIdLink(idlink: string) {
        this.idlink = idlink;
    }
    setEpNumber(epnum: number) {
        this.epnumber = epnum;
    }
}
