import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '../interfaces/topic.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TopicResponse } from '../interfaces/api/topic-response';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiUrl = environment.baseUrl + '/topics';

  constructor(private http: HttpClient) {}

  /**
   * Get topics
   * @returns 
   */
  getAll(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }

  /**
   * Get topic by Id
   * @param id 
   * @returns 
   */
  getById(id: string): Observable<Topic> {
    return this.http.get<Topic>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create topic
   * @param topic
   * @returns 
   */
  create(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.apiUrl, topic);
  }

  /**
   * Update topic
   * @param id 
   * @param topic 
   * @returns 
   */
  update(id: string, topic: Topic): Observable<Topic> {
    return this.http.put<Topic>(`${this.apiUrl}/${id}`, topic);
  }

  /**
   * Delete topic
   * @param id 
   * @returns 
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
