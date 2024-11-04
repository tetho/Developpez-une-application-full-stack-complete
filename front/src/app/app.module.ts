import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostListComponent } from './features/posts/components/post-list/post-list.component';
import { PostDetailComponent } from './features/posts/components/post-detail/post-detail.component';
import { PostFormComponent } from './features/posts/components/post-form/post-form.component';
import { CommentFormComponent } from './features/comments/components/comment-form/comment-form.component';
import { CommentListComponent } from './features/comments/components/comment-list/comment-list.component';
import { CommentDetailComponent } from './features/comments/components/comment-detail/comment-detail.component';
import { TopicListComponent } from './features/topics/components/topic-list/topic-list.component';
import { TopicDetailComponent } from './features/topics/components/topic-detail/topic-detail.component';
import { TopicFormComponent } from './features/topics/components/topic-form/topic-form.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailComponent,
    PostFormComponent,
    CommentFormComponent,
    CommentListComponent,
    CommentDetailComponent,
    TopicListComponent,
    TopicDetailComponent,
    TopicFormComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
