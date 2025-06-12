import { examResponse } from './../models/examResponse';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  baseURL: string='http://localhost:3000/exams';

  constructor(private http: HttpClient) { }

  getAllExams(): Observable<{ status: string, data: examResponse[] }>{
    return this.http.get<{ status: string, data: examResponse[] }>(this.baseURL);
  }

  getTeacherExams(): Observable<{ status: string, data: examResponse[] }> {
    return this.http.get<{ status: string, data: examResponse[] }>(`${this.baseURL}/teacher`);
  }

  getExamById(id: string): Observable<{ status: string, data: examResponse }> {
    return this.http.get<{ status: string, data: examResponse }>(`${this.baseURL}/${id}`);
    }
}
