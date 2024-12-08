import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { PostService } from 'src/app/services/post.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public posts$ = this.postService.getPostsForSubscribedTopics();
  public authors: { [key: string]: User } = {};

  constructor(
    private sessionService: SessionService,
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.posts$.subscribe(posts => {
      posts.forEach(post => {
        if (post.user_id?.id) {
          this.loadAuthor(String(post.user_id.id));
        } else {
          console.error('user_id is undefined or invalid for post:', post);
        }
      });
    });
  }

  loadAuthor(userId: string): void {
    if (!this.authors[userId]) {
      this.userService.getById(userId).subscribe(author => {
        this.authors[userId] = author;
      }, error => {
        console.error("Erreur lors du chargement de l'auteur:", error);
      });
    }
  }
}
