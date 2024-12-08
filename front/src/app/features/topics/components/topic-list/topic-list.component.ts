import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/interfaces/topic.interface';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  
  public topics$ = this.topicService.getAll();
  public subscribedTopics: Topic[] = [];

  constructor(
    private sessionService: SessionService,
    private topicService: TopicService,
    private userService: UserService
  ) { }

  get user(): User | undefined {
    return this.sessionService.user;
  }

  isSubscribed(topic: Topic): boolean {
    return this.subscribedTopics.some(subscribedTopic => subscribedTopic.topic_id === topic.topic_id);
  }
  
  subscribe(topicId: string): void {
    if (this.user) {
      this.userService.subscribeToTopic(topicId).subscribe(() => {
        //this.subscribedTopics = this.subscribedTopics.filter(topic => String(topic.topic_id) !== topicId);
        this.topicService.getById(topicId).subscribe(topic => {
          this.subscribedTopics.push(topic);
        });
      });
    }
  }

  unsubscribe(topicId: string): void {
    if (this.user) {
      this.userService.unsubscribeFromTopic(topicId).subscribe(() => {
        this.subscribedTopics = this.subscribedTopics.filter(topic => String(topic.topic_id) !== topicId);
      });
    }
  }

  ngOnInit(): void {
    if (this.user) {
      this.userService.getSubscribedTopics(String(this.user.id)).subscribe(topics => {
        this.subscribedTopics = topics;
      });
    }
  }
}
