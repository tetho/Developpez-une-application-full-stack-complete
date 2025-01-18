import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})

export class CommentFormComponent implements OnInit {
  @Output() commentAdded = new EventEmitter<void>();

  public onUpdate: boolean = false;
  public commentForm: FormGroup | undefined;
  private id: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private commentService: CommentService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('update')) {
      this.onUpdate = true;
      this.id = this.route.snapshot.paramMap.get('id')!;
      this.commentService
        .getById(Number(this.id))
        .subscribe((comment: Comment) => this.initForm(comment));
    } else {
      this.initForm();
    }
  }

  public submit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    const comment = {
      ...this.commentForm?.value,
      post_id: Number(postId),
    } as Comment;

    if (!this.onUpdate) {
      this.commentService.create(comment).subscribe({
        next: (_: Comment) => {
          this.matSnackBar.open('Commentaire créé !', 'Close', { duration: 3000 });
          this.commentForm?.reset();
          this.commentAdded.emit(); // Notifie l'ajout d'un commentaire
        },
        error: (err) => console.error('Erreur lors de la création', err),
      });
    } else {
      this.commentService.update(this.id!, comment).subscribe({
        next: (_: Comment) => {
          this.matSnackBar.open('Commentaire mis à jour', 'Close', { duration: 3000 });
          this.commentForm?.reset();
          this.commentAdded.emit(); // Notifie la mise à jour d'un commentaire
        },
        error: (err) => console.error('Erreur lors de la mise à jour', err),
      });
    }
  }

  private initForm(comment?: Comment): void {
    this.commentForm = this.fb.group({
      text: [comment ? comment.text : '', [Validators.required]],
    });
  }
}
