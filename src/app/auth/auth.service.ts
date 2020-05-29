import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AuthResponseData } from './auth-response-data.model';


@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  user  = new BehaviorSubject<User>(null);
  // private user: User;

  constructor(private router: Router, private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSxg0IhYhDqXg-MpS6fRwt030ifDnDrAQ',
    {
      email,
      password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.hadleAuthentication(
        resData.email,
        resData.localid,
        resData.idToken,
        +resData.expiresIn
        );
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSxg0IhYhDqXg-MpS6fRwt030ifDnDrAQ',
      {
        email,
        password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError), tap(resData => {
        this.hadleAuthentication(
          resData.email,
          resData.localid,
          resData.idToken,
          +resData.expiresIn
          );
      }));
  }

  // login(authData: AuthData) {
  //   this.user = {
  //     email: authData.email,
  //     userId: Math.round(Math.random() * 10000).toString()
  //   };
  //   this.authSuccess();
  // }

  private hadleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
      );
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists.';
      break;
      case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
      case 'INVALID_PASSWORD':
      errorMessage = 'Password is invalid.';
      break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.user.next(null);
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  authSuccess() {
    this.authChange.next(true);
    this.router.navigate(['/todos']);
  }
}
