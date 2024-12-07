import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CommentService } from 'src/app/services/comment.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent  implements OnInit {

  public comments$!: Observable<Comment[]>;
  
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.comments$ = this.commentService.getByPostId(Number(postId));
    }
  }

  get user(): User | undefined {
    return this.sessionService.user;
  }

}
