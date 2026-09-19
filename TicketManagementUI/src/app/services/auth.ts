import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Auth {


  private apiUrl =
    'https://localhost:7085/api/Auth';


  constructor(
    private http: HttpClient
  ) {}


  // =========================
  // LOGIN
  // =========================

  login(
    email: string,
    password: string
  ): Observable<any> {

    const data = {

      email: email,

      password: password

    };


    return this.http.post<any>(
      `${this.apiUrl}/login`,
      data
    );
  }


  // =========================
  // REGISTER
  // =========================

  register(
    data: any
  ): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/register`,
      data
    );
  }


  // =========================
  // SAVE TOKEN
  // =========================

  saveToken(
    token: string
  ): void {

    localStorage.setItem(
      'token',
      token
    );
  }


  // =========================
  // GET TOKEN
  // =========================

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );
  }


  // =========================
  // LOGOUT
  // =========================

  logout(): void {

    localStorage.removeItem(
      'token'
    );
  }


  // =========================
  // CHECK LOGIN
  // =========================

  isLoggedIn(): boolean {

    return !!this.getToken();
  }


  // =========================
  // GET ROLE FROM JWT
  // =========================

  getRole(): string {

    const token =
      this.getToken();


    if (!token) {

      return '';

    }


    try {

      const payload =
        token.split('.')[1];


      const decodedPayload =
        JSON.parse(

          atob(

            payload
              .replace(/-/g, '+')
              .replace(/_/g, '/')

          )

        );


      return (

        decodedPayload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]

        ||

        decodedPayload.role

        ||

        ''

      );

    }

    catch {

      return '';

    }
  }

}