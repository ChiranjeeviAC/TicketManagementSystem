import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Ticket } from '../services/ticket';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-ticket-details',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.css'
})
export class TicketDetails implements OnInit {

  ticketId!: number;

  ticket: any = null;

  comments: any[] = [];

  statusHistory: any[] = [];

  loading = true;

  errorMessage = '';

  commentText = '';

  addingComment = false;

  role = '';

  solverId: number | null = null;

  selectedStatus = '';

  resolutionNotes = '';

  actionLoading = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: Ticket,
    private auth: Auth
  ) {}


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.errorMessage = 'Invalid ticket ID.';

      this.loading = false;

      return;
    }

    this.ticketId = Number(id);

    this.role = this.auth.getRole();

    this.loadTicket();

    this.loadActivity();
  }


  loadTicket(): void {

    this.loading = true;

    this.ticketService
      .getTicketById(this.ticketId)
      .subscribe({

        next: (response) => {

          console.log('Ticket details:', response);

          this.ticket =
            response.data || response;

          this.selectedStatus =
            this.ticket.status || '';

          this.loading = false;
        },

        error: (error) => {

          console.error(
            'Ticket details error:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Unable to load ticket details.';

          this.loading = false;
        }
      });
  }


  loadActivity(): void {

    this.ticketService
      .getActivity(this.ticketId)
      .subscribe({

        next: (response) => {

          const activity =
            response.data || response;

          this.comments =
            activity?.comments || [];

          this.statusHistory =
            activity?.statusHistory || [];
        },

        error: (error) => {

          console.error(
            'Activity error:',
            error
          );

          this.comments = [];

          this.statusHistory = [];
        }
      });
  }


  editTicket(): void {

    this.router.navigate([
      '/update-ticket',
      this.ticketId
    ]);
  }


  assignSolver(): void {

    if (!this.solverId) {

      alert('Please enter Solver ID.');

      return;
    }

    this.actionLoading = true;

    this.ticketService
      .assignSolver(
        this.ticketId,
        this.solverId
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Assign response:',
            response
          );

          this.actionLoading = false;

          this.solverId = null;

          this.loadTicket();
        },

        error: (error) => {

          console.error(
            'Assign error:',
            error
          );

          this.actionLoading = false;

          alert(
            error.error?.message ||
            'Unable to assign solver.'
          );
        }
      });
  }


  changeStatus(): void {

    if (!this.selectedStatus) {

      alert('Please select a status.');

      return;
    }

    this.actionLoading = true;

    const data = {

      status: this.selectedStatus,

      resolutionNotes:
        this.resolutionNotes.trim() || null

    };

    this.ticketService
      .updateStatus(
        this.ticketId,
        data
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Status response:',
            response
          );

          this.actionLoading = false;

          this.resolutionNotes = '';

          this.loadTicket();

          this.loadActivity();
        },

        error: (error) => {

          console.error(
            'Status error:',
            error
          );

          this.actionLoading = false;

          alert(
            error.error?.message ||
            'Unable to change ticket status.'
          );
        }
      });
  }


  addComment(): void {

    if (!this.commentText.trim()) {

      return;
    }

    this.addingComment = true;

    this.ticketService
      .addComment(
        this.ticketId,
        this.commentText.trim()
      )
      .subscribe({

        next: () => {

          this.commentText = '';

          this.addingComment = false;

          this.loadActivity();
        },

        error: (error) => {

          console.error(
            'Comment error:',
            error
          );

          this.addingComment = false;

          alert(
            error.error?.message ||
            'Unable to add comment.'
          );
        }
      });
  }


  goBack(): void {

    this.router.navigate([
      '/dashboard'
    ]);
  }


  getStatusClass(status: string): string {

    if (!status) {
      return '';
    }

    return status
      .toLowerCase()
      .replace(' ', '-');
  }


  getPriorityClass(priority: string): string {

    if (!priority) {
      return '';
    }

    return priority.toLowerCase();
  }
}