import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Ticket } from '../services/ticket';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
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

    this.ticketService.getAllTickets()
      .subscribe({

        next: (response) => {

          console.log('Tickets response:', response);

          if (response.data) {
            this.tickets = response.data;
          } else {
            this.tickets = response;
          }

          this.loading = false;
        },

        error: (error) => {

          console.error('Ticket loading error:', error);

          this.errorMessage =
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