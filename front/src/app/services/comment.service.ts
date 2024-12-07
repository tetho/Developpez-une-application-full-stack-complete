import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/interfaces/comment.interface';
import { Observable } from 'rxjs';

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
   * Get comments by post id
   * @param postId 
   * @returns 
   */
  getByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/post/${postId}`);
  }

  /**
   * Create comment
   * @param comment 
   * @returns 
   */
  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  /**
   * Update comment
   * @param id 
   * @param comment 
   * @returns 
   */
  update(id: string, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${id}`, comment);
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
