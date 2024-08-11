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

  signup_manual_hash(account:Login):Observable<Login>{
    return this.http.post<Login>(`${this.apiUrl}/accounts/manual_hash`, account);
  }
  signup_bycrip_hash(account:Login):Observable<Login>{
    return this.http.post<Login>(`${this.apiUrl}/accounts/bcrypt_hash`, account);
  }
}
