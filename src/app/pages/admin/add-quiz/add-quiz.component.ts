import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; // Correct import
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule, // Correct import
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) {}

  categories = [
    {
      cid: 23,
      title: 'Programming',
    },
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    active: true,
    category: {
      cid: '',
    },
  };

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in loading data from server', 'error');
      }
    );
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required!', '', {
        duration: 3000,
      });
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire('Success', 'quiz is added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestion: '',
          active: true,
          category: {
            cid: '',
          },
        };
      },
      (error: any) => {
        Swal.fire('Error!', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );
  }
}
