import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false';
  options: { text: string; isCorrect: boolean }[];
  correct: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private questions$ = new BehaviorSubject<Question[]>([]);

  getQuestions(): Observable<Question[]> {
    return this.questions$.asObservable();
  }

  getQuestionById(id: string): Observable<Question | undefined> {
    return this.getQuestions().pipe(map(qs => qs.find(q => q.id === id)));
  }

  addQuestion(q: Question) {
    const current = this.questions$.value;
    this.questions$.next([...current, { ...q, id: Date.now().toString() }]);
  }

  updateQuestion(id: string, q: Question) {
    const updated = this.questions$.value.map(quest => quest.id === id ? { ...q, id } : quest);
    this.questions$.next(updated);
  }

  deleteQuestion(id: string) {
    this.questions$.next(this.questions$.value.filter(q => q.id !== id));
  }
}
