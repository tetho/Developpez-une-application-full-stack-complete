import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { MeComponent } from './features/me/me.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    //canActivate: [UnauthGuard],
    //loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    component: HomeComponent
  },
  {
    path: 'home',
    //canActivate: [UnauthGuard],
    component: HomeComponent
  },
  {
    path: 'login',
    //canActivate: [UnauthGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    //canActivate: [UnauthGuard],
    component: RegisterComponent
  },
  {
    path: 'me',
    //canActivate: [AuthGuard],
    component: MeComponent
  },
  {
    path: 'topics',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./features/topics/topics.module').then(m => m.TopicsModule)
  },
  {
    path: 'posts',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./features/posts/posts.module').then(m => m.PostsModule)
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
