import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('User is required');
      this._snackBar.open('Username is required!', '', {
        duration: 3000,
      });
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (data: any) => {
        // console.log(data);
        // alert('User added successfully');
        Swal.fire('Success!', 'User id is ' + data.id, 'success');
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open('Error occurred while adding user', '', {
          duration: 3000,
        });
      },
      complete: () => {
        // console.log('completed');
        // alert('User addition process completed');
      },
    });
  }
}
