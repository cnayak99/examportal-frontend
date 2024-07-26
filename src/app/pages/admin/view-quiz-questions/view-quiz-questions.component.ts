import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../services/quiz.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css',
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  questions: any;
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['title'];

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteQuestion(qId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure? Do you want to delete this question?',
    }).then((result) => {
      this._question.deleteQuestion(qId).subscribe(
        (data) => {
          this._snack.open('Question Deleted', '', {
            duration: 3000,
          });
          this.questions = this.questions.filter((q: any) => q.quesId != qId);
        },

        (error) => {
          this._snack.open('Error in deleting questions', '', {
            duration: 3000,
          });
          console.log(error);
        }
      );
    });
  }
}
