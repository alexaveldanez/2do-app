import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from './user.model';
import { UserData } from './user-data';
import { AuthData } from './auth-data.model';
import { AuthResponseData } from './auth-response-data.model';





@Injectable()
export class AuthService {
  // authChange = new Subject<boolean>();
  user  = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  // private user: User;

  constructor(private router: Router, private http: HttpClient, private afAuth: AngularFireAuth ) {}

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

  autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
      );

    if (loadedUser.token) {
       this.user.next(loadedUser);
       const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
       this.autoLogout(expirationDuration);
      }
  }

  private hadleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
    ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
      );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
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
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getUser() {
    return { ...this.user };
  }

  async isAuth() {
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;
    return isLoggedIn;
  }


}
