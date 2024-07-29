import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardActions,
    MatListModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent implements OnInit {
  qId: any;
  quiz: any;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];

    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        alert('Error in loading quiz data');
      }
    );
  }
}
