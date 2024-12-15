import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PostResponse } from '../interfaces/api/post-response';
import { User } from '../interfaces/user.interface';

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
    return this.http.get<Post[]>(this.apiUrl).pipe(
      map((posts: any[]) =>
        posts.map(post => ({
          ...post,
          user_id: { id: post.user_id, username: '', email: '', password: '', role: '' } as User
        }))
      )
    );
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
   * Get posts for subscribed topics
   * @returns 
   */
  getPostsForSubscribedTopics(sortOrder: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/subscribed?sortOrder=${sortOrder}`).pipe(
      map((posts: any[]) =>
        posts.map(post => ({
          ...post,
          user_id: { id: post.user_id, username: '', email: '', password: '', role: '' } as User
        }))
      )
    );
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
