import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/auth/authentication.service';
import { UserDataService } from '../service/data/users/user-data.service';
import {  UserLogin } from '../UserLogin';
import { LoginDetails } from '../login-details';
import { TokenResponse } from '../TokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginId = ''
  password = ''

  token!: string;
  errMsg!: string;
  user : UserLogin={
    'email':"",
    'password':"",
  };

  authResponse:TokenResponse ={
    emailId:"",
    role:[],
    isTokenValid:false,
    isExpired:false
  };


  loginDtls!: LoginDetails

  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  constructor(private router: Router, private autheneticationService: AuthenticationService, private service: UserDataService) { }

  ngOnInit(): void {
  }

  
  
  handleLogin() {
    this.user.email=this.loginId;
    this.user.password=this.password;
    console.log(this.loginId);
    console.log(this.password);
    this.service.authenticateUser(this.user).subscribe({ next:(response:any) => {
      this.errMsg='';
      console.log(response);
      this.loginDtls= response as LoginDetails;
      console.log(this.loginDtls);
      sessionStorage.setItem("token", this.loginDtls.jwt);
      sessionStorage.setItem("authenticatedUser",this.loginDtls.email);
      console.log(this.loginDtls.jwt);
      let tokenResponse=this.service.validateToken(this.loginDtls.jwt);
      tokenResponse.subscribe((data1)=>{
        console.log(data1);
        this.authResponse=data1 as TokenResponse;
        console.log(this.authResponse);
        if(this.authResponse.isTokenValid){
          console.log("true valid");
          sessionStorage.setItem("role",this.authResponse.role[0]);
          this.router.navigate(['lms/get-all-courses']);

        }
        else{
          console.log("false valid");

        }      
    });},error:(err)=>{  
      console.log(err);
      this.errMsg = "Invalid Credentials!";
      window.alert(this.errMsg);
    }});

  }

}
