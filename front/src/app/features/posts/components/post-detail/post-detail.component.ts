import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment.interface';
import { Post } from 'src/app/interfaces/post.interface';
import { Topic } from 'src/app/interfaces/topic.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { SessionService } from 'src/app/services/session.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']

})
export class PostDetailComponent implements OnInit {
  public post!: Post;
  public topic!: Topic | undefined;
  public author!: User | undefined;
  public comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private topicService: TopicService,
    private userService: UserService,
    private commentService: CommentService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadPost(id);
    this.loadComments(id);
  }

  private loadPost(id: string): void {
    this.postService.getById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.userService.getById(String(post.user_id)).subscribe({
          next: (user) => (this.author = user),
          error: (err) => console.error('Erreur lors du chargement de l\'auteur :', err),
        });
        this.topicService.getById(String(post.topic_id)).subscribe({
          next: (topic) => (this.topic = topic),
          error: (err) => console.error('Erreur lors du chargement du topic :', err),
        });
      },
      error: (err) => console.error('Erreur lors du chargement du post :', err),
    });
  }

  private loadComments(postId: string): void {
    this.commentService.getByPostId(Number(postId)).subscribe({
      next: (comments) => (this.comments = comments),
      error: (err) => console.error('Erreur lors du chargement des commentaires :', err),
    });
  }

  public onCommentAdded(): void {
    const postId = this.route.snapshot.paramMap.get('id')!;
    this.loadComments(postId);
  }
}
