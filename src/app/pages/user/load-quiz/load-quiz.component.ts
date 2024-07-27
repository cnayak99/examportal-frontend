import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { MatCardModule } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../services/quiz.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCardActions, MatButtonModule],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css',
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  quizzes: any;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) {}
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        console.log('Load all the quiz');

        this._quiz.quizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            alert('There is some error');
          }
        );
      } else {
        console.log('load specific quiz');
        this._quiz.getQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error) => {
            alert('error in loading quiz data');
          }
        );
      }
    });
  }
}
