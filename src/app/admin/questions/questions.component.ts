import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Exam, Question } from '../../models/exam.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  exams: Exam[] = [];
  selectedExamId: string | null = null;
  selectedExam: Exam | null = null;

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit() {
    this.examService.getExams().subscribe(exams => {
      this.exams = exams;
    });
  }

  onExamChange() {
    this.selectedExam = this.exams.find(e => e.id === this.selectedExamId) || null;
  }

  addQuestion() {
    if (this.selectedExam) {
      this.router.navigate(['/admin/questions/add'], { queryParams: { examId: this.selectedExam.id } });
    }
  }

  editQuestion(q: Question) {
    if (this.selectedExam) {
      this.router.navigate(['/admin/questions/edit', q.id], { queryParams: { examId: this.selectedExam.id } });
    }
  }

  deleteQuestion(qid: string) {
    if (this.selectedExam && confirm('Are you sure you want to delete this question?')) {
      this.selectedExam.questions = this.selectedExam.questions.filter(q => q.id !== qid);
      this.examService.updateExam(this.selectedExam.id, { questions: this.selectedExam.questions }).subscribe(() => {
        // Refresh the selected exam
        this.onExamChange();
      });
    }
  }
}
