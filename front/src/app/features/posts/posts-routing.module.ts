import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';

const routes: Routes = [
  { title: 'Posts', path : '', component: PostListComponent},
  { title: 'Posts - create', path : 'create', component: PostFormComponent},
  { title: 'Posts - detail', path : ':id', component: PostDetailComponent},
  { title: 'Posts - update', path : 'update/:id', component: PostFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
