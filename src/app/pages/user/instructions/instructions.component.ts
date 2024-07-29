import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    CommonModule,
  ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent implements OnInit {
  qId: any;
  quiz: any;
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router
  ) {}

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

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qId]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
