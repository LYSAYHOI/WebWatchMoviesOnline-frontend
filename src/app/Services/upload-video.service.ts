import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UploadVideoService {

    private client_id: string ="231885";
    private client_secret: string ="ad9fcab262febf8b";
    private getUploadUrlAPI: string ="https://www.fembed.com/api/upload";
    private getVideoIdAPI: string ="https://www.fembed.com/api/fingerprint";
    // private progressBar: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    // private videoID: BehaviorSubject<String> = new BehaviorSubject<String>("");
    // progressBar$:  Observable<number> = this.progressBar.asObservable();
    // videoID$:  Observable<String> = this.videoID.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    getUploadUrl() {
        //let data = 'client_id=231885&client_secret=ad9fcab262febf8b'
        let data = new HttpParams()
             .set("client_id", this.client_id)
             .set("client_secret", this.client_secret);
        return this.http.post(this.getUploadUrlAPI, data, {
            headers: new HttpHeaders({
                "Content-Type": "application/x-www-form-urlencoded"
            })
        });
    }

    getVideoId(fingerprint: string) {
        let data = new HttpParams()
             .set("client_id", this.client_id)
             .set("client_secret", this.client_secret)
             .set("file_fingerprint", fingerprint);
        return this.http.post(this.getVideoIdAPI, data, {
            headers: new HttpHeaders({
                "Content-Type": "application/x-www-form-urlencoded"
            })
        });
    }
}