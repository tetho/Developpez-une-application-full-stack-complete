import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './features/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService) {
  }

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['']);
  }

  public toggleSidenav(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  public onSidenavClose(): void {
  }
}
