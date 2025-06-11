import { ExamService } from './../../services/examService';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { examResponse } from '../../models/examResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  exams: examResponse[] = [];

  constructor(private examService: ExamService){}

  ngOnInit():void{
    let x= this.examService.getAllExams().subscribe({
      next: (res)=>{
        this.exams =res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
