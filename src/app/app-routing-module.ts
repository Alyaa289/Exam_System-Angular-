import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { QuestionsComponent } from './admin/questions/questions.component';
import { AddQuestionComponent } from './admin/questions/add-question.component';
import { EditQuestionComponent } from './admin/questions/edit-question.component';

const routes: Routes = [
  {
    path: 'admin/questions',
    component: QuestionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/questions/add',
    component: AddQuestionComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/questions/edit/:id',
    component: EditQuestionComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
