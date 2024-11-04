import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';

const routes: Routes = [
  { path : '', component: CommentListComponent},
  { path : ':id', component: CommentDetailComponent},
  { path : '/create', component: CommentFormComponent},
  { path : '/update/:id', component: CommentFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
