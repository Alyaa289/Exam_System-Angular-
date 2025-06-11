import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExamService, Exam, Question } from '../../services/exam';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exam-form.html',
  styleUrls: ['./exam-form.css']
})
export class ExamFormComponent {
  exams: Exam[] = [];
  selectedExamId: number | null = null;
  selectedExam: Exam | null = null;
  selectedQuestionId: number | null = null;
  selectedQuestion: Question | null = null;
  action: 'add' | 'edit' | 'delete' | null = null;
  questionForm: Partial<Question> = { options: [] };
  optionInput: string = '';

  constructor(private examService: ExamService) {
    this.refreshExams();
  }

  refreshExams() {
    this.exams = this.examService.getExams();
    if (this.selectedExamId) {
      this.selectedExam = this.examService.getExamById(this.selectedExamId) || null;
    }
  }

  selectExam(examId: number) {
    this.selectedExamId = examId;
    this.selectedExam = this.examService.getExamById(examId) || null;
    this.selectedQuestionId = null;
    this.selectedQuestion = null;
    this.action = null;
    this.resetForm();
    this.refreshExams();
  }

  selectQuestion(qId: number) {
    this.selectedQuestionId = qId;
    this.selectedQuestion = this.selectedExam?.questions.find(q => q.id === qId) || null;
    this.action = null;
    this.resetForm();
  }

  chooseAction(act: 'add' | 'edit' | 'delete') {
    this.action = act;
    if (act === 'add') {
      this.resetForm();
    } else if ((act === 'edit' || act === 'delete') && this.selectedQuestion) {
      this.questionForm = {
        text: this.selectedQuestion.text,
        options: [...this.selectedQuestion.options],
        correct: this.selectedQuestion.correct
      };
    }
  }

  addOption() {
    if (this.optionInput.trim()) {
      this.questionForm.options = this.questionForm.options || [];
      this.questionForm.options.push(this.optionInput.trim());
      this.optionInput = '';
    }
  }

  removeOption(idx: number) {
    this.questionForm.options?.splice(idx, 1);
  }

  addQuestion() {
    if (!this.selectedExam || !this.questionForm.text || !this.questionForm.options?.length || !this.questionForm.correct) return;
    const newId = this.selectedExam.questions.length ? Math.max(...this.selectedExam.questions.map(q => q.id)) + 1 : 1;
    this.examService.addQuestion(this.selectedExam.id, {
      id: newId,
      text: this.questionForm.text,
      options: [...(this.questionForm.options || [])],
      correct: this.questionForm.correct
    });
    this.resetForm();
    this.action = null;
    this.refreshExams();
  }

  updateQuestion() {
    if (!this.selectedExam || this.selectedQuestionId === null || !this.questionForm.text || !this.questionForm.options?.length || !this.questionForm.correct) return;
    this.examService.updateQuestion(this.selectedExam.id, {
      id: this.selectedQuestionId,
      text: this.questionForm.text,
      options: [...(this.questionForm.options || [])],
      correct: this.questionForm.correct
    });
    this.resetForm();
    this.action = null;
    this.refreshExams();
  }

  deleteQuestion() {
    if (!this.selectedExam || this.selectedQuestionId === null) return;
    this.examService.deleteQuestion(this.selectedExam.id, this.selectedQuestionId);
    this.selectedQuestionId = null;
    this.selectedQuestion = null;
    this.action = null;
    this.resetForm();
    this.refreshExams();
  }

  resetForm() {
    this.questionForm = { options: [] };
    this.optionInput = '';
  }

  cancelAction() {
    this.action = null;
    this.resetForm();
  }
}
