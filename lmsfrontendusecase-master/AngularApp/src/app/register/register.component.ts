import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService, Users } from '../service/data/users/user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Users[] = []

  userName = ''
  email=''
  password = ''
  confirmPassword = ''  
  errorBool = false;

  constructor(private service: UserDataService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    this.service.register(new Users(this.userName, this.email,this.password)).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['lms/login'])
      },
      error => {
        console.log(error);
        this.errorBool = true
      }
    )

  }

}
