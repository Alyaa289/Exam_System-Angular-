import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ExamService } from '../../services/exam.service';
import { LoadingService } from '../../services/loading.servise';
import { Exam } from '../../models/exam.model'; 

@Component({
  selector: 'app-exam-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exam-management.component.html',
      styleUrls: ['./exam-management.component.css']

})
export class ExamManagementComponent {
  exams: Exam[] = [];

  private examService = inject(ExamService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.loadingService.showLoading();
    this.examService.getExams().subscribe({
      next: (exams) => {
        this.exams = exams;
        this.loadingService.hideLoading();
      },
      error: (error) => {
        console.error('Error loading exams:', error);
        this.loadingService.hideLoading();
      },
    });
  }

  deleteExam(examId: string): void {
    if (confirm('Are you sure you want to delete this exam? This action cannot be undone.')) {
      this.loadingService.showLoading();
      this.examService.deleteExam(examId).subscribe({
        next: () => {
          this.loadExams();
        },
        error: (error) => {
          console.error('Error deleting exam:', error);
          this.loadingService.hideLoading();
        },
      });
    }
  }
}
