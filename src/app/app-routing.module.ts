import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './components/Guard/authentication.guard'

import { HomeComponent } from './components/HomePage/home/home.component';
import { AnimeComponent } from './components/AnimePage/anime/anime.component';
import { ChangeUserInfoComponent } from './components/UserPages/change-user-info/change-user-info.component';
import { ChangeUserPasswordComponent } from './components/UserPages/change-user-password/change-user-password.component';
import { UserWatchedFilmsComponent } from './components/UserPages/user-watched-films/user-watched-films.component';
import { UserLikedFilmsComponent } from './components/UserPages/user-liked-films/user-liked-films.component';
import { UserFollowedFilmsComponent } from './components/UserPages/user-followed-films/user-followed-films.component';
import { RankingComponent } from './components/RankingPage/ranking/ranking.component';
import { UserForgotPasswordComponent } from './components/UserPages/user-forgot-password/user-forgot-password.component';
import { Page404Component } from './components/page404/page404.component';
import { PlayerFilmComponent } from './components/PlayerFilmPage/player-film/player-film.component'
import { AdminComponent } from './components/AdminPage/admin/admin.component';
import { GenreComponent } from './components/AdminPage/genre/genre.component';
import { FilmComponent } from './components/AdminPage/film/film.component';
import { RoleGuardService } from './Services/role-guard.service'
import { DashBoardComponent } from './components/AdminPage/dash-board/dash-board.component';
import { UserComponent } from './components/AdminPage/user/user.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'theloai/:genreName',
        component: AnimeComponent
    },
    {
        path: 'search/:keyword',
        component: SearchPageComponent
    },
    {
        path: 'sua-thong-tin',
        component: ChangeUserInfoComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'doi-mat-khau',
        component: ChangeUserPasswordComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'phim-da-xem',
        component: UserWatchedFilmsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'phim-da-thich',
        component: UserLikedFilmsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'phim-dang-theo-doi',
        component: UserFollowedFilmsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'bang-xep-hang',
        component: RankingComponent
    },
    {
        path: 'quen-mat-khau',
        component: UserForgotPasswordComponent
    },
    {
        path: 'phim',
        component: PlayerFilmComponent
    },
    {
        path: 'phim/:filmId/:filmName/:filmNumber',
        component: PlayerFilmComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: 'ADMIN'
        },
        children: [
            {
                path: 'film',
                component: FilmComponent,
                canActivate: [RoleGuardService],
                data: {
                    expectedRole: 'ADMIN'
                }
            },
            {
                path: 'genre',
                component: GenreComponent,
                canActivate: [RoleGuardService],
                data: {
                    expectedRole: 'ADMIN'
                }
            },
            {
                path: 'user',
                component: UserComponent,
                canActivate: [RoleGuardService],
                data: {
                    expectedRole: 'ADMIN'
                }
            }
        ]
    },
    {
        path: '**',
        component: Page404Component
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
