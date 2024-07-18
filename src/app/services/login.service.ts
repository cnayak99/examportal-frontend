import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import baseUrl from './helper';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public getCurrentUser() {
    return this.http.get<User>(`${baseUrl}/current-user`);
  }

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn(): boolean {
    const tokenStr = localStorage.getItem('token');
    return tokenStr !== undefined && tokenStr !== '' && tokenStr !== null;
  }

  public logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);
    return token;
  }

  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr) as User;
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole(): string | null {
    const user = this.getUser();
    return user ? user['authorities'][0].authority : null;
  }
}

// src/app/models/user.model.ts
