import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { Auth } from '../services/auth';


@Component({
  selector: 'app-login',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class Login {


  email = '';

  password = '';

  errorMessage = '';

  loading = false;


  constructor(

    private auth: Auth,

    private router: Router

  ) {}


  // =========================
  // LOGIN
  // =========================

  login(): void {


    this.errorMessage = '';


    if (!this.email.trim()) {

      this.errorMessage =
        'Please enter email.';

      return;
    }


    if (!this.password) {

      this.errorMessage =
        'Please enter password.';

      return;
    }


    this.loading = true;


    this.auth
      .login(
        this.email.trim(),
        this.password
      )

      .subscribe({


        next: (response) => {


          console.log(
            'Login response:',
            response
          );


          const token =
            response?.data?.token ||
            response?.token;


          if (token) {


            this.auth.saveToken(
              token
            );


            this.router.navigate([
              '/dashboard'
            ]);


          }

          else {


            this.errorMessage =
              'Token was not received from server.';

          }


          this.loading = false;

        },


        error: (error) => {


          console.error(
            'Login error:',
            error
          );


          this.errorMessage =
            error.error?.message ||
            'Invalid email or password.';


          this.loading = false;

        }

      });

  }


  // =========================
  // GO TO REGISTER
  // =========================

  goToRegister(): void {

    this.router.navigate([
      '/register'
    ]);

  }

}