import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ExamService } from '../../services/exam.service';
import { LoadingService } from '../../services/loading.servise';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './exam-form.component.html',
    styleUrls: ['./exam-form.component.css']

})
export class ExamFormComponent {
  exam: Partial<Exam> = {
    title: '',
    description: '',
    duration: 30,
    passingScore: 70,
    isActive: true,
    questions: []
  };

  isEditMode = false;

  private examService = inject(ExamService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');

    if (examId) {
      this.isEditMode = true;
      this.loadingService.showLoading();

      this.examService.getExamById(examId).subscribe({
        next: (exam) => {
          this.exam = exam;
          this.loadingService.hideLoading();
        },
        error: () => {
          this.router.navigate(['/admin/exams']);
          this.loadingService.hideLoading();
        }
      });
    }
  }

  onSubmit(): void {
    this.loadingService.showLoading();

    if (this.isEditMode) {
      this.examService.updateExam(this.exam.id!, this.exam).subscribe({
        next: () => {
          this.router.navigate(['/admin/exams']);
        },
        error: (error) => {
          console.error('Error updating exam:', error);
          this.loadingService.hideLoading();
        }
      });
    } else {
      this.examService.createExam(this.exam as Exam).subscribe({
        next: (exam) => {
 this.router.navigate(['/admin/exams']);        },
        error: (error) => {
          console.error('Error creating exam:', error);
          this.loadingService.hideLoading();
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/exams']);
  }
}
