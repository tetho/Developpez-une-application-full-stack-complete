import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/interfaces/topic.interface';
import { SessionService } from 'src/app/services/session.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private topicService: TopicService,
    private sessionService: SessionService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.topicService.getById(id).subscribe({
      next: (topic) => (this.topic = topic),
      error: (err) => console.error('Erreur lors du chargement du topic :', err),
    });
  }

}
