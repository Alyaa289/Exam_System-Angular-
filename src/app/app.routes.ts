import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';
import { TakeExamComponent } from './student/take-exam/take-exam.component';
import { ExamResultComponent } from './student/exam-result/exam-result.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { ExamFormComponent } from './admin/exam-form/exam-form.component';
import { QuestionFormComponent } from './admin/exam-form/question-form/question-form.component';
import { ViewResultsComponent } from './admin/view-results/view-results.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'student/dashboard', component: DashboardComponent },
  { path: 'student/take-exam', component: TakeExamComponent },
  { path: 'student/exam-result', component: ExamResultComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/exam-form', component: ExamFormComponent },
  { path: 'admin/question-form', component: QuestionFormComponent },
  { path: 'admin/view-results', component: ViewResultsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
