import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../models/exam.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  questionForm: FormGroup;
  exam: Exam | null = null;

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
    if (examId) {
      this.examService.getExamById(examId).subscribe(exam => this.exam = exam);
    }
  }

  addOption() {
    if (this.options) {
      this.options.push(this.fb.group({ text: ['', Validators.required], isCorrect: [false] }));
    }
  }

  removeOption(i: number) {
    if (this.options && this.options.length > 2) this.options.removeAt(i);
  }

  onTypeChange() {
    if (!this.options) return;
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
    if (this.questionForm.valid && this.exam) {
      const newQ = {
        ...this.questionForm.value,
        id: Date.now().toString(),
        examId: this.exam.id
      };
      this.exam.questions.push(newQ);
      this.examService.updateExam(this.exam.id, { questions: this.exam.questions }).subscribe(() => {
        this.router.navigate(['/admin/questions'], { queryParams: { examId: this.exam ? this.exam.id : '' } });
      });
    }
  }
}
