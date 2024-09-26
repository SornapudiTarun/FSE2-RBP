import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from 'src/app/TokenResponse';
import { UserLogin } from 'src/app/UserLogin';

export class Users {
  constructor(public userName: string,public email: string, public password: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:5000";

  register(user: Users) {
    console.log(user)
    return this.http.post(this.url + "/api/v1.0/lms/auth/register", user)
  }

  getUsers() {
    return this.http.get<Users[]>(this.url + "/tweets/users/all")
  }

  getUser(loginId: String) {
    return this.http.get<Users>(this.url + `/tweets/user/${loginId}`)
  }

  authenticateUser(user:UserLogin):Observable<any> {
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const options = {
      headers :headers,
      body:user
    };
    console.log("calling api")
    // return this.http.request('GET',this.url +`/api/v1.0/lms/auth/login`,options);
    return this.http.post<any>(this.url +`/api/v1.0/lms/auth/login`,user);
  }
  validateToken(token:string){
    const header = {
      headers: {
        'Authorization': `Bearer ${token}`
        
      }
    }
    console.log("calling validate token api");
    console.log(header)
    return this.http.get(this.url +`/api/v1.0/lms/auth/validate`,header);
  }
}
