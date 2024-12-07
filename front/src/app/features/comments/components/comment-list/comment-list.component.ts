import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { CommentService } from 'src/app/services/comment.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {

  //@Input() postId!: number;
  postId = 1;
  public comments$ = this.commentService.getByPostId(this.postId);

  constructor(
    private sessionService: SessionService,
    private commentService: CommentService
  ) { }

  get user(): User | undefined {
    return this.sessionService.user;
  }

}
