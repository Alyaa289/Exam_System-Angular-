import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ExamService, Exam, Question } from '../../services/exam';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit, OnDestroy {
  exam: Exam | null = null;
  questions: (Question & { answer?: string })[] = [];
  examId: number | null = null;
  score: number | null = null;
  showScoreModal = false;
  private sub: Subscription = new Subscription();

  constructor(private examService: ExamService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Listen to both queryParams and navigation events for live updates
    this.sub.add(
      this.route.queryParams.subscribe(params => {
        this.examId = params['examId'] ? +params['examId'] : null;
        this.updateExamAndQuestions();
      })
    );
    this.sub.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateExamAndQuestions();
        }
      })
    );
  }

  updateExamAndQuestions() {
    if (this.examId) {
      this.exam = this.examService.getExamById(this.examId) || null;
      this.questions = this.exam ? this.exam.questions.map(q => ({ ...q, answer: '' })) : [];
    }
  }

  onAnswerChange(questionId: number, answer: string) {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.answer = answer;
    }
  }

  submitExam() {
    let score = 0;
    for (const q of this.questions) {
      if (q.answer === q.correct) {
        score++;
      }
    }
    this.score = score;
    this.showScoreModal = true;
  }

  closeScoreModal() {
    this.showScoreModal = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}