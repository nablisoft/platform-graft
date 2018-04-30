import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  currentUser: any;
  private _isAuthenticated = new BehaviorSubject(false);


  constructor() {
    this.autoLogin();
  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  saveUserData(token: string, refreshToken: string) {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.setUserToken(token);
    }
  }

  getToken(token: string) {
    try {
    const jwt = new JwtHelper();
    return jwt.decodeToken(token);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  setUserToken(token?: string) {
    const jwt = new JwtHelper();
    this.currentUser = jwt.decodeToken(token);

    this._isAuthenticated.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('refreshToken');
    this.currentUser = null;

    this._isAuthenticated.next(false);
  }

  loggedIn() {
    return tokenNotExpired();
    // const jwt = new JwtHelper();
    // return jwt.getTokenExpirationDate(token);
  }

  autoLogin() {
    const token = localStorage.getItem('token');

    if (token) {
      this.setUserToken(token);
    }
  }

}