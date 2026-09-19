import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  fullName = '';
  email = '';
  password = '';
  phoneNumber = '';
  role = 'Employee';

  loading = false;

  errorMessage = '';

  successMessage = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}


  register(): void {

    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';


    // Validate Full Name
    if (!this.fullName.trim()) {

      this.errorMessage =
        'Please enter your full name.';

      return;
    }


    // Validate Email
    if (!this.email.trim()) {

      this.errorMessage =
        'Please enter your email.';

      return;
    }


    // Validate Password
    if (!this.password) {

      this.errorMessage =
        'Please enter a password.';

      return;
    }


    if (this.password.length < 6) {

      this.errorMessage =
        'Password must contain at least 6 characters.';

      return;
    }


    // Validate Phone Number
    if (!this.phoneNumber.trim()) {

      this.errorMessage =
        'Please enter your phone number.';

      return;
    }


    this.loading = true;


    // Data sent to backend
    const data = {

      fullName: this.fullName.trim(),

      email: this.email.trim(),

      password: this.password,

      phoneNumber: this.phoneNumber.trim(),

      role: this.role

    };


    console.log(
      'Register request:',
      data
    );


    // Call Register API
    this.auth.register(data).subscribe({

      next: (response) => {

        console.log(
          'Register response:',
          response
        );

        this.loading = false;


        this.successMessage =
          response?.message ||
          'Registration successful.';


        // Go to login after 1 second
        setTimeout(() => {

          this.router.navigate([
            '/login'
          ]);

        }, 1000);
      },


      error: (error) => {

        console.error(
          'Register error:',
          error
        );

        this.loading = false;


        this.errorMessage =
          error.error?.message ||
          'Unable to register user.';
      }

    });
  }


  goToLogin(): void {

    this.router.navigate([
      '/login'
    ]);
  }
}