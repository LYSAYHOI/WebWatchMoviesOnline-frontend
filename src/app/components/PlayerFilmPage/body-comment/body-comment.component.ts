import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerSidebarServiceService } from '../../../Services/player-sidebar-service.service'
import { CommentService }  from '../../../Services/comment.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DialogModalService } from '../../../Services/dialog-modal.service';

@Component({
    selector: 'app-body-comment',
    templateUrl: './body-comment.component.html',
    styleUrls: ['./body-comment.component.css']
})
export class BodyCommentComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private pagesize: number = 10;
    private listComment;
    private commentContent: string;
    
    constructor(
        private _PlayerSidebarServiceService: PlayerSidebarServiceService,
        private commentService: CommentService,
        private activateRouter: ActivatedRoute,
        private dialog: DialogModalService
    ) { }

    ngOnInit() {
        this.getComment();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getComment() {
        let data = {
            filmId: this.activateRouter.snapshot.paramMap.get("filmId"),
            pagesize: this.pagesize
        }
        this.subscription = this.commentService.getComment(data).subscribe(
            (response) => {
                this.listComment = response;
            }, (error) => {
                console.log(error);
            }
        )
    }

    addComment() {
        if(this.commentContent != ""){
            let data = {
                commentContent: this.commentContent,
                film: {
                    filmId: this.activateRouter.snapshot.paramMap.get("filmId")
                }
            }
            this.subscription = this.commentService.addComment(data).subscribe(
                (response) => {
                    this.getComment();
                    this.commentContent = "";
                }, (error) => {
                    if(error.status == 401)
                        this.dialog.openDialog("Error", "Please login in order to comment")
                    else this.dialog.openDialog("Error", error.message)
                }
            );
        }
    }

    readMoreComment() {
        this.pagesize = this.pagesize + 5;
        this.getComment();
    }
}
