import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = '/comments';

  constructor(private http: HttpClient) {}

  /**
   * Get comments
   * @returns 
   */
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }

  /**
   * Get comment by Id
   * @param id 
   * @returns 
   */
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create comment
   * @param comment 
   * @returns 
   */
  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  /**
   * Update comment
   * @param id 
   * @param comment 
   * @returns 
   */
  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${id}`, comment);
  }

  /**
   * Delete comment
   * @param id 
   * @returns 
   */
  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
