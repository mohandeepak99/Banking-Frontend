import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';

const BASIC_URL = "http://localhost:8765/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(BASIC_URL + "api/auth/login", credentials).pipe(
      tap(response => {
        StorageService.saveToken(response.jwt);
        StorageService.saveUser(response);
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);
      })
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/auth/signup", user);
  }

  isLoggedIn(): boolean {
    return StorageService.getToken() !== '';
  }
}