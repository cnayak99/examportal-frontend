import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css',
})
export class ViewCategoriesComponent implements OnInit {
  categories = [
    { cid: 23, title: 'Programming', description: 'this is testing category' },
    { cid: 23, title: 'gk', description: 'this is testing category' },
    { cid: 23, title: 'practice', description: 'this is testing category' },
  ];
  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading categories', 'error');
      }
    );
  }
}
