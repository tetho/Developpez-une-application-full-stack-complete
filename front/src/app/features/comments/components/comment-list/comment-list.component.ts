import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CommentService } from 'src/app/services/comment.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  private _commentsSubject = new BehaviorSubject<Comment[]>([]);
  comments$ = this._commentsSubject.asObservable();

  @Input()
  set comments(comments: Comment[]) {
    this._commentsSubject.next(comments);
  }

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {}

  get user(): User | undefined {
    return this.sessionService.user;
  }
}
