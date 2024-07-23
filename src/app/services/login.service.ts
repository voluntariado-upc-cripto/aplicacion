import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = environment.apiURL;
  constructor(private http:HttpClient) { }

  login(email: string, password: string):Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/accounts/login`, { email, password });
  }
}
