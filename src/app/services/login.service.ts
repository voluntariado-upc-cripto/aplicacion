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

  login(acc:Login):Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/accounts/login`,acc);
  }
  getAccounts():Observable<Login[]>{
    return this.http.get<Login[]>(`${this.apiUrl}/accounts`);
  }

}
