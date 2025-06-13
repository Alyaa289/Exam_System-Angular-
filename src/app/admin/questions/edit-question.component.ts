import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Exam, Question } from '../../models/exam.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  questionForm: FormGroup;
  exam: Exam | null = null;
  question: Question | null = null;

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.questionForm = this.fb.group({
      text: ['', Validators.required],
      type: ['multiple-choice', Validators.required],
      options: this.fb.array([
        this.fb.group({ text: ['', Validators.required], isCorrect: [false] }),
        this.fb.group({ text: ['', Validators.required], isCorrect: [false] })
      ]),
      points: [1, Validators.required]
    });
  }

  get options() { return (this.questionForm.get('options') as FormArray) ?? new FormArray([]); }

  ngOnInit() {
    const examId = this.route.snapshot.queryParamMap.get('examId');
    const questionId = this.route.snapshot.paramMap.get('id');
    if (examId) {
      this.examService.getExamById(examId).subscribe(exam => {
        this.exam = exam;
        if (questionId && this.exam) {
          this.question = this.exam.questions.find(q => q.id === questionId) || null;
          if (this.question) {
            this.questionForm.patchValue({
              text: this.question.text,
              type: this.question.type,
              points: this.question.points
            });
            this.options.clear();
            this.question.options.forEach(opt => {
              this.options.push(this.fb.group({ text: [opt.text, Validators.required], isCorrect: [opt.isCorrect] }));
            });
          }
        }
      });
    }
  }

  addOption() {
    this.options.push(this.fb.group({ text: ['', Validators.required], isCorrect: [false] }));
  }

  removeOption(i: number) {
    if (this.options.length > 2) this.options.removeAt(i);
  }

  onTypeChange() {
    if (this.questionForm.value.type === 'true-false') {
      this.options.clear();
      this.options.push(this.fb.group({ text: 'True', isCorrect: [false] }));
      this.options.push(this.fb.group({ text: 'False', isCorrect: [false] }));
    } else if (this.options.length < 2) {
      while (this.options.length < 2) {
        this.addOption();
      }
    }
  }

  submit() {
    if (this.questionForm.valid && this.exam && this.question) {
      const updatedQ = {
        ...this.questionForm.value,
        id: this.question.id,
        examId: this.exam.id
      };
      const idx = this.exam.questions.findIndex(q => q.id === this.question!.id);
      if (idx > -1) {
        this.exam.questions[idx] = updatedQ;
        this.examService.updateExam(this.exam.id, { questions: this.exam.questions }).subscribe(() => {
          this.router.navigate(['/admin/questions'], { queryParams: { examId: this.exam ? this.exam.id : '' } });
        });
      }
    }
  }
}
