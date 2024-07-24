import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../services/quiz.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-quizzez',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './view-quizzez.component.html',
  styleUrl: './view-quizzez.component.css',
})
export class ViewQuizzezComponent implements OnInit {
  quizzes = [
    {
      qId: 23,
      title: 'Basic Java Quiz',
      description:
        'Java is a programming language that is class-based and object-oriented. ',
      maxMarks: '50',
      numberOfQuestion: '20',
      active: '',
      category: {
        title: 'Programming',
      },
    },
    {
      qId: 23,
      title: 'Basic Java Quiz',
      description:
        'Java is a programming language that is class-based and object-oriented. ',
      maxMarks: '50',
      numberOfQuestion: '20',
      active: '',
      category: {
        title: 'Programming',
      },
    },
  ];
  constructor(private _quiz: QuizService) {}
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log('show quiz data is: ' + data.numberOfQuestions);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading data !', 'error');
      }
    );
  }
}
