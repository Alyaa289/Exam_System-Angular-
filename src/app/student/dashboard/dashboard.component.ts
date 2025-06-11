import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamService, Exam } from '../../services/exam';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  exams: Exam[] = [];

  constructor(private examService: ExamService, private router: Router) {
    this.exams = this.examService.getExams();
  }

  goToExam(exam: Exam) {
    this.router.navigate(['/student/take-exam'], { queryParams: { examId: exam.id } });
  }
}
