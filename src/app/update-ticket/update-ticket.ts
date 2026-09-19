import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Ticket } from '../services/ticket';

@Component({
  selector: 'app-update-ticket',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-ticket.html',
  styleUrl: './update-ticket.css'
})
export class UpdateTicket implements OnInit {

  ticketId!: number;

  title = '';
  description = '';
  priority = 'Medium';

  ticketNumber = '';

  loading = true;
  saving = false;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: Ticket
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Invalid ticket ID.';
      this.loading = false;
      return;
    }

    this.ticketId = Number(id);

    this.loadTicket();
  }

  loadTicket(): void {

    this.ticketService
      .getTicketById(this.ticketId)
      .subscribe({

        next: (response) => {

          console.log('Ticket:', response);

          const data = response.data || response;

          this.ticketNumber = data.ticketNumber || '';

          this.title = data.title || '';

          this.description = data.description || '';

          this.priority = data.priority || 'Medium';

          this.loading = false;
        },

        error: (error) => {

          console.error('Load ticket error:', error);

          this.errorMessage =
            error.error?.message ||
            'Unable to load ticket.';

          this.loading = false;
        }
      });
  }

  updateTicket(): void {

    this.errorMessage = '';

    if (!this.title.trim()) {
      this.errorMessage = 'Please enter a ticket title.';
      return;
    }

    if (!this.description.trim()) {
      this.errorMessage = 'Please enter a description.';
      return;
    }

    this.saving = true;

    const data = {
      title: this.title.trim(),
      description: this.description.trim(),
      priority: this.priority
    };

    this.ticketService
      .updateTicket(this.ticketId, data)
      .subscribe({

        next: (response) => {

          console.log('Update response:', response);

          this.saving = false;

          this.router.navigate([
            '/ticket',
            this.ticketId
          ]);
        },

        error: (error) => {

          console.error('Update error:', error);

          this.saving = false;

          this.errorMessage =
            error.error?.message ||
            'Unable to update ticket.';
        }
      });
  }

  cancel(): void {

    this.router.navigate([
      '/ticket',
      this.ticketId
    ]);
  }
}