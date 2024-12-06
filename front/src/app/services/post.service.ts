import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PostResponse } from '../interfaces/api/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.baseUrl + '/posts';

  constructor(private http: HttpClient) {}

  /**
   * Get all posts
   * @returns 
   */
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  /**
   * Get post by Id
   * @param id 
   * @returns 
   */
  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create post
   * @param post
   * @returns 
   */
  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  /**
   * Update post
   * @param id 
   * @param form 
   * @returns 
   */
  update(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  /**
   * Delete post
   * @param id 
   * @returns 
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
