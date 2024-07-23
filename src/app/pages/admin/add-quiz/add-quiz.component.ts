import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { title } from 'process';
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
    MatFormField,
    MatLabel,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent {
  categories = [
    {
      cid: 23,
      title: 'Programming',
    },
    {
      cid: 23,
      title: 'Programming',
    },
  ];
}
