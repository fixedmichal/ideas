import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnChanges {

  errorMessage: string = null;

  isInLoginMode: boolean = true;

  isLoading: boolean = false;

  @ViewChild('loginForm') loginForm: NgForm;

  @ViewChild('registerForm') registerForm: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onLoginSubmit() {
    const {loginEmail, loginPassword} = this.loginForm.value;
    this.isLoading = true;
    console.log(loginEmail)
    this.authService.authenticate(loginEmail, loginPassword, true).subscribe( responseData => {
      console.log(responseData)
      this.isLoading = false;
      this.router.navigate(['/ideas']);
    },

    errorMessage => {
      console.log(errorMessage);
      this.errorMessage = errorMessage;
      this.isLoading = false;
    }
    );

  }

  onRegisterSubmit() {
    const {registerFirstName,
           registerLastName, 
           registerEmail, 
           registerPassword} = this.registerForm.value;

    this.isLoading = true;

    this.authService.authenticate(registerEmail, registerPassword, false).subscribe( responseData => {
      console.log(responseData)
      this.isLoading = false;
    },

    errorMessage => {
      console.log(errorMessage);
      this.errorMessage = errorMessage;
      this.isLoading = false;
    }
    );

    this.registerForm.reset()
  }

  onRegisterFormClear() {
    this.registerForm.reset();
  }

  onLoginChecked() {
    this.isInLoginMode = true;
  }

  onRegistrationChecked() {
    this.isInLoginMode = false;
  }

  onHandleError() {
    this.errorMessage = null;
  }
  
  ngOnChanges() {
    console.log("bla")
    console.log(this.isInLoginMode)
  }


}
