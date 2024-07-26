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

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  public getCurrentUser() {
    return this.http.get<User>(`${baseUrl}/current-user`);
  }

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  public loginUser(token: any) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
    return true;
  }

  public isLoggedIn(): boolean {
    if (this.isBrowser()) {
      const tokenStr = localStorage.getItem('token');
      return tokenStr !== undefined && tokenStr !== '' && tokenStr !== null;
    }
    return false;
  }

  public logout(): boolean {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return true;
  }

  public getToken(): string | null {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      return token;
    }
    return null;
  }

  public setUser(user: any): void {
    if (this.isBrowser()) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  public getUser(): User | null {
    if (this.isBrowser()) {
      const userStr = localStorage.getItem('user');
      if (userStr != null) {
        return JSON.parse(userStr) as User;
      } else {
        this.logout();
        return null;
      }
    }
    return null;
  }

  public getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.authorities[0].authority : null;
  }
}
