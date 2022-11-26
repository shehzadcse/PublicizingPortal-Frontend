import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  loggedIn = new BehaviorSubject<Boolean>(false);
  constructor(private http:HttpClient) { }

  register(data:any){
    return this.http.post(this.baseUrl + '/register', data);
  }

  login(data:any){
    return this.http.post(this.baseUrl + '/login', data);
  }
  loggedInSubscription(){
    return this.loggedIn.asObservable();
  }
  setLoggedIn(){
    this.loggedIn.next(true);
  }

  
}
