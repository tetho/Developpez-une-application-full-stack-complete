import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { HeaderComponent } from './shared/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './features/auth/auth-routing.module';
import { AuthModule } from './features/auth/auth.module';
import { CommentsRoutingModule } from './features/comments/comments-routing.module';
import { CommentsModule } from './features/comments/comments.module';
import { PostsModule } from './features/posts/posts.module';
import { PostsRoutingModule } from './features/posts/posts-routing.module';
import { TopicsRoutingModule } from './features/topics/topics-routing.module';
import { TopicsModule } from './features/topics/topics.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MeComponent } from './features/me/me.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    MeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,
    CommentsRoutingModule,
    CommentsModule,
    PostsModule,
    PostsRoutingModule,
    TopicsRoutingModule,
    TopicsModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
