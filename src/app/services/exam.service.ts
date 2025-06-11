import { Injectable } from '@angular/core';
import { examResponse } from './../models/examResponse';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Exam, Question } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

     private exams: Exam[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and basic DOM manipulation.',
      duration: 30,
      passingScore: 70,
      isActive: true,
      questions: [
        {
          id: '101',
          examId: '1',
          text: 'Which of the following is a primitive data type in JavaScript?',
          type: 'multiple-choice',
          options: [
            { id: '1001', text: 'Array', isCorrect: false },
            { id: '1002', text: 'Object', isCorrect: false },
            { id: '1003', text: 'String', isCorrect: true },
            { id: '1004', text: 'Function', isCorrect: false }
          ],
          points: 10
        },
        {
          id: '102',
          examId: '1',
          text: 'What will the following code output? console.log(typeof [])',
          type: 'single-choice',
          options: [
            { id: '1005', text: 'array', isCorrect: false },
            { id: '1006', text: 'object', isCorrect: true },
            { id: '1007', text: 'undefined', isCorrect: false },
            { id: '1008', text: 'null', isCorrect: false }
          ],
          points: 10
        },
        {
          id: '103',
          examId: '1',
          text: 'JavaScript is a case-sensitive language.',
          type: 'true-false',
          options: [
            { id: '1009', text: 'True', isCorrect: true },
            { id: '1010', text: 'False', isCorrect: false }
          ],
          points: 5
        }
      ],
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-01-15')
    },
    {
      id: '2',
      title: 'Angular Basics',
      description: 'Test your understanding of Angular concepts including components, services, and dependency injection.',
      duration: 45,
      passingScore: 75,
      isActive: true,
      questions: [
        {
          id: '201',
          examId: '2',
          text: 'Which of the following decorators is used to define an Angular component?',
          type: 'single-choice',
          options: [
            { id: '2001', text: '@Component', isCorrect: true },
            { id: '2002', text: '@NgModule', isCorrect: false },
            { id: '2003', text: '@Injectable', isCorrect: false },
            { id: '2004', text: '@Directive', isCorrect: false }
          ],
          points: 10
        },
        {
          id: '202',
          examId: '2',
          text: 'Which of the following lifecycle hooks is called after Angular has initialized all data-bound properties?',
          type: 'single-choice',
          options: [
            { id: '2005', text: 'ngOnInit', isCorrect: true },
            { id: '2006', text: 'ngOnChanges', isCorrect: false },
            { id: '2007', text: 'ngAfterViewInit', isCorrect: false },
            { id: '2008', text: 'ngOnDestroy', isCorrect: false }
          ],
          points: 10
        }
      ],
      createdAt: new Date('2023-02-20'),
      updatedAt: new Date('2023-02-25')
    }
  ];
  
  getExams(): Observable<Exam[]> {
    return of(this.exams).pipe(delay(500));
  }

  getActiveExams(): Observable<Exam[]> {
    return this.getExams().pipe(
      map(exams => exams.filter(exam => exam.isActive))
    );
  }

  getExamById(id: string): Observable<Exam> {
    const exam = this.exams.find(e => e.id === id);
    if (!exam) {
      return throwError(() => new Error('Exam not found'));
    }
    return of(exam).pipe(delay(300));
  }

  createExam(exam: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>): Observable<Exam> {
    const newExam: Exam = {
      ...exam,
      id: (this.exams.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.exams.push(newExam);
    return of(newExam).pipe(delay(500));
  }

  updateExam(id: string, examData: Partial<Exam>): Observable<Exam> {
    const index = this.exams.findIndex(e => e.id === id);
    if (index === -1) {
      return throwError(() => new Error('Exam not found'));
    }
    
    const updatedExam = {
      ...this.exams[index],
      ...examData,
      updatedAt: new Date()
    };
    
    this.exams[index] = updatedExam;
    return of(updatedExam).pipe(delay(500));
  }

  deleteExam(id: string): Observable<boolean> {
    const index = this.exams.findIndex(e => e.id === id);
    if (index === -1) {
      return throwError(() => new Error('Exam not found'));
    }
    
    this.exams.splice(index, 1);
    return of(true).pipe(delay(500));
  }


}