import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';

const routes: Routes = [
  { title: 'Topics', path : '', component: TopicListComponent},
  { title: 'Topics - create', path : 'create', component: TopicFormComponent},
  { title: 'Topics - detail', path : ':id', component: TopicDetailComponent},
  { title: 'Topics - update', path : 'update/:id', component: TopicFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }
