import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { Topic } from 'src/app/interfaces/topic.interface';
import { PostService } from 'src/app/services/post.service';
import { SessionService } from 'src/app/services/session.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  public onUpdate: boolean = false;
  public postForm: FormGroup | undefined;
  public topics$ = this.topicService.getAll();
  private id: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private postService: PostService,
    private topicService: TopicService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('update')) {
      this.onUpdate = true;
      this.id = this.route.snapshot.paramMap.get('id')!;
      this.postService
        .getById(this.id)
        .subscribe((post: Post) => this.initForm(post));
    } else {
      this.initForm();
    }
  }

  public submit(): void {
    const post = this.postForm?.value as Post;

    if (!this.onUpdate) {
      this.postService
        .create(post)
        .subscribe({
          next: (_: Post) => {
              this.exitPage('Article créé !');
          },
          error: (err) => console.error('Erreur lors de la création', err),
      });
    } else {
      this.postService
        .update(this.id!, post)
        .subscribe({
          next: (_: Post) => {
              this.exitPage('Article mis à jour');
          },
          error: (err) => console.error('Erreur lors de la mise à jour', err),
      });
    }
  }

  private initForm(post?: Post): void {
    if( (post !== undefined)) {
      this.router.navigate(['/posts']);
    }
    this.postForm = this.fb.group({
      title: [
        post ? post.title : '',
        [Validators.required]
      ],
      topic_id: [
        post ? post.topic_id : '',
        [Validators.required]
      ],
      content: [
        post ? post.content : '', 
        [Validators.required]
      ],
    });
  }

  private exitPage(message: string): void {
    this.matSnackBar.open(message, 'Close', { duration: 3000 });
    this.router.navigate(['posts']);
  }
}
