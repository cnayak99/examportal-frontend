import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardActions,
    MatListModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
  qId: any;
  questions: any;
  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}
  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params['qId'];
    console.log(this.qId);
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState('', '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState('', '', location.href);
    });
  }
}
