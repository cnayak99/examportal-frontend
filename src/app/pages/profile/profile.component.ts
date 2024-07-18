import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  constructor(private login: LoginService) {}
  ngOnInit(): void {
    this.user = this.login.getUser();
  }
}
