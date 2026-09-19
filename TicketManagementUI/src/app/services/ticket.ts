import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ticket {

  private apiUrl =
    'https://localhost:7085/api/Tickets';

  constructor(
    private http: HttpClient
  ) {}


  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  getAllTickets(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );
  }


  getTicketById(
    id: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }


  createTicket(
    ticket: any
  ): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      ticket,
      {
        headers: this.getHeaders()
      }
    );
  }


  updateTicket(
    id: number,
    ticket: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      ticket,
      {
        headers: this.getHeaders()
      }
    );
  }


  assignSolver(
    id: number,
    solverId: number
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}/assign`,
      {
        solverId
      },
      {
        headers: this.getHeaders()
      }
    );
  }


  updateStatus(
    id: number,
    data: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}/status`,
      data,
      {
        headers: this.getHeaders()
      }
    );
  }


  addComment(
    id: number,
    comment: string
  ): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/${id}/comments`,
      {
        comment
      },
      {
        headers: this.getHeaders()
      }
    );
  }


  getActivity(
    id: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}/activity`,
      {
        headers: this.getHeaders()
      }
    );
  }
}