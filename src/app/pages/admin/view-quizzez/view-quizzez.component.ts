import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
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
  ],
  templateUrl: './view-quizzez.component.html',
  styleUrl: './view-quizzez.component.css',
})
export class ViewQuizzezComponent implements OnInit {
  quizzes = [];
  constructor(private _quiz: QuizService) {}
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading data !', 'error');
      }
    );
  }
}
