import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.baseUrl + '/users';

  constructor(private http: HttpClient) {}

  /**
   * Get users
   * @returns 
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Get user by Id
   * @param id 
   * @returns 
   */
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create user
   * @param user 
   * @returns 
   */
  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  /**
   * Update user
   * @param id 
   * @param user 
   * @returns 
   */
  update(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Delete user
   * @param id 
   * @returns 
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get subscribed
   * @param userId 
   * @returns 
   */
  getSubscribedTopics(userId: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/topics`);
  }

  /**
   * Subscribe to topic
   * @param userId 
   * @param topicId 
   * @returns 
   */
  subscribeToTopic(topicId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/me/topics/${topicId}/subscribe`, {});
  }

  /**
   * Unsubscribe from topic
   * @param userId 
   * @param topicId 
   * @returns 
   */
  unsubscribeFromTopic(topicId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/topics/${topicId}/unsubscribe`);
  }
}
