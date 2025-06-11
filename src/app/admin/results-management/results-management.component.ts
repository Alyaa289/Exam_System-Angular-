import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-results-management',
  templateUrl: './results-management.component.html',
  styleUrls: ['./results-management.component.css']
})
export class ResultsManagementComponent {
   totalStudents = 1;
  averageScore = 1;
  passRate = 1;

  results = [
   {
   examName: 'Exam 1',
      studentId: 2,
    completedAt: new Date(),
    score: 40,
      questions: 3
    }, {
   examName: 'Exam 1',
      studentId: 2,
    completedAt: new Date(),
    score: 40,
      questions: 3
    },
    {
   examName: 'Exam 1',
      studentId: 2,
    completedAt: new Date(),
    score: 40,
      questions: 3
    }
  ];
}
