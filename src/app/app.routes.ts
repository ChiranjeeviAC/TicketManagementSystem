import { Routes } from '@angular/router';

import { Login } from './login/login';

import { Register } from './register/register';

import { Dashboard } from './dashboard/dashboard';

import { CreateTicket } from './create-ticket/create-ticket';

import { TicketDetails } from './ticket-details/ticket-details';

import { UpdateTicket } from './update-ticket/update-ticket';


export const routes: Routes = [


  // =========================
  // DEFAULT
  // =========================

  {
    path: '',

    redirectTo: 'login',

    pathMatch: 'full'
  },


  // =========================
  // LOGIN
  // =========================

  {
    path: 'login',

    component: Login
  },


  // =========================
  // REGISTER
  // =========================

  {
    path: 'register',

    component: Register
  },


  // =========================
  // DASHBOARD
  // =========================

  {
    path: 'dashboard',

    component: Dashboard
  },


  // =========================
  // CREATE TICKET
  // =========================

  {
    path: 'create-ticket',

    component: CreateTicket
  },


  // =========================
  // TICKET DETAILS
  // =========================

  {
    path: 'ticket/:id',

    component: TicketDetails
  },


  // =========================
  // UPDATE TICKET
  // =========================

  {
    path: 'update-ticket/:id',

    component: UpdateTicket
  }

];