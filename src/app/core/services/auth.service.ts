// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    // localStorage.removeItem('user'); // Optional: Remove additional user data
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

  // Check if the user is logged in.
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
