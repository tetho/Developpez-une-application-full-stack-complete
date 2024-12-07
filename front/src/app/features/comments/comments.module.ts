import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { CommentsRoutingModule } from './comments-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    //CommentListComponent,
    //CommentFormComponent,
    CommentDetailComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    ...materialModules
  ]
})
export class CommentsModule { }
