import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  private apiUrl: string = environment.apiURL;
  constructor(private http:HttpClient) { }

  signup(account:Login):Observable<Login>{
    return this.http.post<Login>(`${this.apiUrl}/accounts`, account);
  }

}
