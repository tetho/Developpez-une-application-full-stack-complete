import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentResponse } from '../interfaces/api/comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = environment.baseUrl + '/comments';

  constructor(private http: HttpClient) {}

  /**
   * Get all comments
   * @returns 
   */
  getAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }

  /**
   * Get comment by Id
   * @param id 
   * @returns 
   */
  getById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create comment
   * @param form 
   * @returns 
   */
  create(form: FormData): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(this.apiUrl, form);
  }

  /**
   * Update comment
   * @param id 
   * @param form 
   * @returns 
   */
  update(id: string, form: FormData): Observable<CommentResponse> {
    return this.http.put<CommentResponse>(`${this.apiUrl}/${id}`, form);
  }

  /**
   * Delete comment
   * @param id 
   * @returns 
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
