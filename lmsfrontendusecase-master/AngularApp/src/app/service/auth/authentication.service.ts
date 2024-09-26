import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }


  
  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser')
  }

  getUser() {
    let user = sessionStorage.getItem('authenticatedUser');
    return user;
  }
  isUserRoleAdmin(){
    let userRole=sessionStorage.getItem('role');
    return (userRole=="ROLE_ADMIN");

  }
}
