import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from '../auth/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AuthSuccess } from '../auth/interfaces/auth-success.interface';
import { MeRequest } from './interfaces/me-request.interface';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  public user: User | undefined;

  public onError = false;

  public meForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.min(3),
        Validators.max(20)
      ]
    ],
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private matSnackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.authService.me().subscribe(
      (user: User) => {
        this.user = user;
  
        this.meForm.patchValue({
          username: user.username,
          email: user.email
        });
      },
      error => {
        this.onError = true;
      }
    );
  }

  public submit(): void {
    const user = this.meForm?.value as User;
    this.userService
        .update(user)
        .subscribe({
          next: (_: User) => {
              this.exitPage('Profil utilisateur mis à jour');
          },
          error: (err) => console.error('Erreur lors de la mise à jour', err),
      });
  }

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }

  private exitPage(message: string): void {
    this.matSnackBar.open(message, 'Close', { duration: 3000 });
    this.router.navigate(['me']);
  }
}
