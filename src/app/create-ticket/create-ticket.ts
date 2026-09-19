import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '../services/ticket';

@Component({
  selector: 'app-create-ticket',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css'
})
export class CreateTicket {

  title = '';
  description = '';
  priority = 'Medium';

  loading = false;
  errorMessage = '';

  constructor(
    private ticketService: Ticket,
    private router: Router
  ) {}

  createTicket(): void {

    this.errorMessage = '';

    if (!this.title.trim()) {
      this.errorMessage = 'Please enter a ticket title.';
      return;
    }

    if (!this.description.trim()) {
      this.errorMessage = 'Please enter a description.';
      return;
    }

    this.loading = true;

    const ticket = {
      title: this.title.trim(),
      description: this.description.trim(),
      priority: this.priority
    };

    this.ticketService.createTicket(ticket).subscribe({

      next: (response) => {

        console.log('Create ticket response:', response);

        this.loading = false;

        /*
          Backend response:

          {
            status: "Success",
            message: "...",
            data: {
              id: 1,
              ticketNumber: "TKT-00001",
              ...
            }
          }
        */

        const createdTicket = response.data || response;

        if (createdTicket?.id) {

          // Go directly to Ticket Details
          this.router.navigate(['/ticket', createdTicket.id]);

        } else {

          this.errorMessage =
            'Ticket created, but ticket ID was not received.';
        }
      },

      error: (error) => {

        console.error('Create ticket error:', error);

        this.loading = false;

        this.errorMessage =
          error.error?.message || 'Unable to create ticket.';
      }

    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}