import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from "angular-progress-bar"

//Guard
import { AuthenticationGuard } from './components/Guard/authentication.guard';
//Service 
import { NavbarServiceService } from './Services/navbar-service.service';
import { PlayerSidebarServiceService } from './Services/player-sidebar-service.service';
import { CallApiService } from './Services/call-api.service';
import { FilmInfoService } from './Services/film-info.service';
import { GetIdFilmService } from './Services/get-id-film.service';
import { LoginApiService } from './Services/login-api.service';
import { CookieService } from 'ngx-cookie-service';
import { EpisodeService } from './Services/episode.service'
import { CommentService } from './Services/comment.service'

import { AppComponent } from './app.component';
import { NavComponent } from './components/NavBar/nav/nav.component';
import { NavbarLeftComponent } from './components/NavBar/navbar-left/navbar-left.component';
import { NavbarRightComponent } from './components/NavBar/navbar-right/navbar-right.component';
import { HomeComponent } from './components/HomePage/home/home.component';
import { SliderWrapperComponent } from './components/HomePage/slider-wrapper/slider-wrapper.component';
import { TrayEpisodeComponent } from './components/HomePage/tray-episode/tray-episode.component';
import { TrayMovieComponent } from './components/HomePage/tray-movie/tray-movie.component';
import { TrayCollectionComponent } from './components/HomePage/tray-collection/tray-collection.component';
import { TrayPickedComponent } from './components/HomePage/tray-picked/tray-picked.component';
import { TrayRankingComponent } from './components/HomePage/tray-ranking/tray-ranking.component';
import { TrayAllComponent } from './components/HomePage/tray-all/tray-all.component';
import { Page404Component } from './components/page404/page404.component';
import { ChangeUserInfoComponent } from './components/UserPages/change-user-info/change-user-info.component';
import { ChangeUserPasswordComponent } from './components/UserPages/change-user-password/change-user-password.component';
import { UserWatchedFilmsComponent } from './components/UserPages/user-watched-films/user-watched-films.component';
import { UserLikedFilmsComponent } from './components/UserPages/user-liked-films/user-liked-films.component';
import { UserFollowedFilmsComponent } from './components/UserPages/user-followed-films/user-followed-films.component';
import { AnimeComponent } from './components/AnimePage/anime/anime.component';
import { RankingComponent } from './components/RankingPage/ranking/ranking.component';
import { PlayerFilmComponent, SafePipe } from './components/PlayerFilmPage/player-film/player-film.component';
import { UserForgotPasswordComponent } from './components/UserPages/user-forgot-password/user-forgot-password.component';
import { BodyEpisodeComponent } from './components/PlayerFilmPage/body-episode/body-episode.component';
import { BodyCommentComponent } from './components/PlayerFilmPage/body-comment/body-comment.component';
import { FilmInfoComponent } from './components/PlayerFilmPage/film-info/film-info.component';
import { SlugPipe } from './components/Pipe/slug.pipe';
import { NumberWithCommasPipe } from './components/Pipe/number-with-commas.pipe';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminComponent } from './components/AdminPage/admin/admin.component';
import { GenreComponent } from './components/AdminPage/genre/genre.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { FilmComponent } from './components/AdminPage/film/film.component';
import { GenrelistWithCommaPipe } from './components/Pipe/genrelist-with-comma.pipe';
import { CollectionApiServiceService } from './Services/collection-api-service.service';
import { DialogModalService } from './Services/dialog-modal.service';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { EpisodeComponent } from './components/AdminPage/episode/episode.component';
import { UploadVideoService } from './Services/upload-video.service';
import { WatchedfilmComponent } from './components/HomePage/watchedfilm/watchedfilm.component';
import { UserComponent } from './components/AdminPage/user/user.component';
//import { MatDialogRef } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        NavbarLeftComponent,
        NavbarRightComponent,
        HomeComponent,
        SliderWrapperComponent,
        TrayEpisodeComponent,
        TrayMovieComponent,
        TrayCollectionComponent,
        TrayPickedComponent,
        TrayRankingComponent,
        TrayAllComponent,
        Page404Component,
        ChangeUserInfoComponent,
        ChangeUserPasswordComponent,
        UserWatchedFilmsComponent,
        UserLikedFilmsComponent,
        UserFollowedFilmsComponent,
        AnimeComponent,
        RankingComponent,
        PlayerFilmComponent,
        UserForgotPasswordComponent,
        BodyEpisodeComponent,
        BodyCommentComponent,
        FilmInfoComponent,
        SafePipe,
        SlugPipe,
        NumberWithCommasPipe,
        AdminComponent,
        GenreComponent,
        FilmComponent,
        GenrelistWithCommaPipe,
        AlertDialogComponent,
        EpisodeComponent,
        WatchedfilmComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        DemoMaterialModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        ProgressBarModule
     //   MatDialogRef
    ],
    entryComponents: [
        AlertDialogComponent,
        EpisodeComponent
    ],
    providers: [
        NavbarServiceService,
        PlayerSidebarServiceService,
        CallApiService,
        FilmInfoService,
        GetIdFilmService,
        LoginApiService,
        CookieService,
        AuthenticationGuard,
        JwtHelperService,
        CollectionApiServiceService,
        DialogModalService,
        EpisodeService,
        UploadVideoService,
        CommentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
