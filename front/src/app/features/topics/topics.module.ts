import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { TopicsRoutingModule } from './topics-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    //TopicListComponent,
    TopicFormComponent,
    TopicDetailComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class TopicsModule { }
