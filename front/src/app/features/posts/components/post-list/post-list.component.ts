import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { PostService } from 'src/app/services/post.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  public posts$ = this.postService.getAll();

  constructor(
    private sessionService: SessionService,
    private postService: PostService
  ) { }

  get user(): User | undefined {
    return this.sessionService.user;
  }

}
