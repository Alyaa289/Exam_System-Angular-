import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { AddQuestionComponent } from './questions/add-question.component';
import { EditQuestionComponent } from './questions/edit-question.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    QuestionsComponent,
    AddQuestionComponent,
    EditQuestionComponent
  ],
  exports: [
    QuestionsComponent,
    AddQuestionComponent,
    EditQuestionComponent
  ]
})
export class AdminModule {}
