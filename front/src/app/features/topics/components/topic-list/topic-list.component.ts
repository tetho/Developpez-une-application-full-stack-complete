import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent {
  
  public topics$ = this.topicService.getAll();

  constructor(
    private sessionService: SessionService,
    private topicService: TopicService
  ) { }

  get user(): User | undefined {
    return this.sessionService.user;
  }

}
