// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/helperModals';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwtToken';
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080';
  signup(credentials: { name: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, credentials);
  }

  login(credentials: { name: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials);
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey); // Replace 'token' with your JWT key
    sessionStorage.removeItem('user'); // Optional: Remove additional user data
  }
  // Retrieve the JWT token.
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Save the JWT token.
  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  // Clear the JWT token (e.g., on logout).
  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  getUser(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // Check if the user is logged in.
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
