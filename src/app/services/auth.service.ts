import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedIn.asObservable();

  private _id=new BehaviorSubject<string>(this.get_id());
  email$ = this._id.asObservable();
  constructor() { }


  setSession(authResult: Login): void {
    sessionStorage.setItem('_id', authResult._id);
    this.loggedIn.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('_id');
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('_id');
  }

  get_id(): string {
    return sessionStorage.getItem('_id') || '';
  }
}
