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
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
  qId: any;
  questions: any;
  timer: any;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  isSubmitted = false;
  totalMarks = 0;
  totalQuestions = 0;

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
        this.totalMarks = this.questions[0].quiz.maxMarks;
        this.totalQuestions = this.questions.length;
        this.timer = this.questions.length * 2 * 60;
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });

        this.startTimer();
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

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this.isSubmitted = true;
    this.questions.forEach((q: any) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswer++;
        let singleMark =
          this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += singleMark;
      }
      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
    console.log('Correct Answer :' + this.correctAnswer);
    console.log('Marks got :' + this.marksGot);
    console.log(this.questions);
    console.log(this.attempted);
  }
}
