import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicResponse } from 'src/app/interfaces/api/topic-response';
import { Topic } from 'src/app/interfaces/topic.interface';
import { SessionService } from 'src/app/services/session.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {

  public onUpdate: boolean = false;
  public topicForm: FormGroup | undefined;

  private id: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private topicService: TopicService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    console.log('URL:', url);
    if (url.includes('update')) {
      this.onUpdate = true;
      this.id = this.route.snapshot.paramMap.get('id')!;
      console.log('ID:', this.id);
      this.topicService
        .getById(this.id)
        .subscribe((topic: Topic) => this.initForm(topic));
    } else {
      this.initForm();
    }
  }

  public submit(): void {
    const topic = this.topicForm?.value as Topic;

    if (!this.onUpdate) {
      this.topicService
        .create(topic)
        .subscribe({
          next: (_: Topic) => {
              this.exitPage('Thème créé !');
          },
          error: (err) => console.error('Erreur lors de la création', err),
      });
    } else {
      this.topicService
        .update(this.id!, topic)
        .subscribe({
          next: (_: Topic) => {
              this.exitPage('Thème mis à jour');
          },
          error: (err) => console.error('Erreur lors de la mise à jour', err),
      });
    }
  }

  private initForm(topic?: Topic): void {
    if( (topic !== undefined)) {
      this.router.navigate(['/topics']);
    }
    this.topicForm = this.fb.group({
      name: [topic ? topic.name : '', [Validators.required]],
      description: [topic ? topic.description : '', [Validators.required]],
    });
  }

  private exitPage(message: string): void {
    this.matSnackBar.open(message, "Close", { duration: 3000 });
    this.router.navigate(['/topics']);
  }
}
