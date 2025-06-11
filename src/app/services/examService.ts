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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    
    return this.http.get<{ status: string, data: examResponse[] }>(this.baseURL,{headers});
  }

  getTeacherExams(): Observable<{ status: string, data: examResponse[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    
    return this.http.get<{ status: string, data: examResponse[] }>(`${this.baseURL}/teacher`,{headers});
  }
}
