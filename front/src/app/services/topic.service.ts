import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '../interfaces/topic.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiUrl = '/topics';

  constructor(private http: HttpClient) {}

  /**
   * Get topics
   * @returns 
   */
  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }

  /**
   * Get topic by Id
   * @param id 
   * @returns 
   */
  getTopicById(id: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create topic
   * @param topic 
   * @returns 
   */
  createTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.apiUrl, topic);
  }

  /**
   * Update topic
   * @param id 
   * @param topic 
   * @returns 
   */
  updateTopic(id: number, topic: Topic): Observable<Topic> {
    return this.http.put<Topic>(`${this.apiUrl}/${id}`, topic);
  }

  /**
   * Delete topic
   * @param id 
   * @returns 
   */
  deleteTopic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
