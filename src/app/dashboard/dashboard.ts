import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../services/ticket';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  tickets: any[] = [];

  loading = true;

  errorMessage = '';

  constructor(
    private ticketService: Ticket,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {

    this.loading = true;
    this.errorMessage = '';

    this.ticketService.getAllTickets()
      .subscribe({

        next: (response) => {

          console.log('Tickets response:', response);

          if (response?.data) {
            this.tickets = response.data;
          } else if (Array.isArray(response)) {
            this.tickets = response;
          } else {
            this.tickets = [];
          }

          this.loading = false;
        },

        error: (error) => {

          console.error('Error loading tickets:', error);

          this.errorMessage =
            error?.error?.message ||
            'Unable to load tickets.';

          this.loading = false;
        }

      });
  }

  createTicket(): void {
    this.router.navigate(['/create-ticket']);
  }

  openTicket(id: number): void {
    this.router.navigate(['/ticket', id]);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}