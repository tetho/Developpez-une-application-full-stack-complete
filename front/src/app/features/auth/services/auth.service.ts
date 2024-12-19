import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/register-request.interface';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthSuccess } from '../interfaces/auth-success.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl + '/auth';

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.apiUrl}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.apiUrl}/login`, loginRequest);
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/me`);
  }

  public updateUser(user: Partial<User>): Observable<{ token: string }> {
    return this.httpClient.put<{ token: string }>(`${this.apiUrl}/update`, user);
  }
}