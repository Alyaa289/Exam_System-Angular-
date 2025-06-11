import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamService } from '../../services/examService';
import { examResponse } from '../../models/examResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private examSevice: ExamService) {}
  exams: examResponse[] = [];
  totalQuestions: number = 0;
  recentActivities: { message: string; }[] = [];
  
  ngOnInit(): void {
    let x = this.examSevice.getTeacherExams().subscribe({
      next: (res) => {
        this.exams = res.data;
        this.totalQuestions = this.calculateTotalQuestions(this.exams);
        this.recentActivities = this.exams.flatMap((e) => {
          if (e.updatedAt && e.updatedAt !== e.createdAt) {
            return [{
              message: `Updated exam "${e.title}"`,
              time: new Date(e.updatedAt),
            }];
          } else {
            return [{
              message: `Created exam "${e.title}"`,
              time: new Date(e.createdAt),
            }];
          }
        })
        .sort((a, b) => b.time.getTime() - a.time.getTime())
        .slice(0, 4);        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private calculateTotalQuestions(exams: examResponse[]): number {
    return exams.reduce(
      (total, exam) => total + (exam.questions?.length || 0),
      0
    );
  }
}
