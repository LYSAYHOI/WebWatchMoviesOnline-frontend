import { Component, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { PlayerSidebarServiceService } from '../../../Services/player-sidebar-service.service'
import { GetIdFilmService } from '../../../Services/get-id-film.service'
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Component({
    selector: 'app-player-film',
    templateUrl: './player-film.component.html',
    styleUrls: ['./player-film.component.css']
})
export class PlayerFilmComponent implements OnInit {
    constructor(
        private _PlayerSidebarServiceService: PlayerSidebarServiceService,
        private GetIdFilmService: GetIdFilmService,
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

    onActive() {
        this._PlayerSidebarServiceService.onToggle()
    }

    link() {
        return 'https://www.fembed.com/v/' + this.GetIdFilmService.idlink+"#autoplay=1";
    }
}
