import { Option } from './../../models/exam.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Exam, Question } from '../../services/exam';
import { ExamService } from '../../services/examService';
import { examResponse } from '../../models/examResponse';
import { Subscription } from 'rxjs';

type QuestionWithAnswer = examResponse['questions'][0] & { answer?: boolean };
@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit, OnDestroy {
  exam: examResponse | null = null;
  questions: QuestionWithAnswer[] = [];
  // questions: examResponse['questions'] = [];
  answers: boolean[]=[];
  examId: string | null = null;
  score: number = 0;
  showScoreModal = false;
  private sub: Subscription = new Subscription();

  constructor(private examService: ExamService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {   
    this.route.paramMap.subscribe({
      next:(params)=>{
        this.examId= params.get('id'); }
      })
    // Listen to both queryParams and navigation events for live updates
    this.sub.add(
      this.route.queryParams.subscribe(params => {
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
      this.examService.getExamById(this.examId).subscribe({
        next: (res) => {
          this.exam = res.data;          
          this.questions = this.exam ? this.exam.questions.map(q => ({ ...q, answer: false })) : [];
        },
        error: (err) => {
          console.error('Failed to fetch exam:', err);
          this.exam = null;
          this.questions = [];
        }
      });
    }
  }

  onAnswerChange(questionId: string, optionId: string) {
    const index = this.questions.findIndex(q => q._id === questionId);
    if (index !== -1) {
      const option = this.questions[index].options.find(o => o._id === optionId);
      if (option) {
        this.questions[index].answer = option.isCorrect;
      }
    }
  }

  submitExam() {
    let score = 0;
    for (const q of this.questions) {
      if (q.answer) {
        score++;
      }
    }
    this.score = score;
    this.showScoreModal = true;
  }

  closeScoreModal() {
    this.showScoreModal = false;
    this.score = 0;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}