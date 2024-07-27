import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'], // Corrected this line
})
export class AddQuestionComponent implements OnInit {
  qId: any;
  qTitle: any;
  question = {
    quiz: {
      qId: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['qTitle'];
    console.log(this.qId, this.qTitle);
    this.question.quiz['qId'] = this.qId;
  }

  formSubmit() {
    if (
      this.question.content.trim() == '' ||
      this.question.option1.trim() == '' ||
      this.question.option2.trim() == '' ||
      this.question.answer.trim() == ''
    ) {
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }

    console.log('Submitting form with data:', this.question);
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Added', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error: any) => {
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}
