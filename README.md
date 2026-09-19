Ticket Management System

A full-stack web-based Ticket Management System developed as an assignment using ASP.NET Core Web API, Angular, and Microsoft SQL Server.

The application allows employees to create and manage support tickets, solvers to work on assigned tickets, and administrators to assign tickets and manage their status.

Project Overview

The system provides a simple workflow for managing IT support tickets:

Employee
   │
   ├── Register / Login
   ├── Create Ticket
   ├── View Ticket
   ├── Update Own Ticket
   └── Add Comments
          │
          ▼
       Ticket
          │
          ├── Admin assigns Solver
          │
          ▼
        Solver
          │
          ├── Update ticket
          ├── Change status
          ├── Add comments
          └── Add resolution notes

Key Features

Authentication & Authorization

User registration and login

Password hashing using ASP.NET Core Identity's PasswordHasher

JWT-based authentication

Role-based authorization

Roles:

Employee

Solver

Admin

Admin registration is restricted

Ticket Management

Create tickets

View all tickets

View ticket details

Update ticket title, description and priority

Assign tickets to Solvers

Change ticket status

Add resolution notes

Add comments

View ticket activity and status history

Ticket Statuses

Open

In Progress

Hold

Closed

Rejected

Ticket Priorities

Low

Medium

High

Critical

Technology Stack

Backend

C#

ASP.NET Core Web API

.NET 8

Entity Framework Core

Microsoft SQL Server

JWT Authentication

REST APIs

Swagger / OpenAPI

Frontend

Angular

TypeScript

HTML5

CSS3

Angular HttpClient

RxJS

Architecture

The backend follows a layered architecture:

Controller
    ↓
Service
    ↓
Repository
    ↓
Entity Framework Core
    ↓
SQL Server

This separation keeps the application easier to maintain, test and extend.

Project Structure

TicketManagementSystem/
│
├── TicketManagementAPI/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   │   ├── Auth/
│   │   └── Tickets/
│   ├── Helpers/
│   ├── Migrations/
│   ├── Models/
│   │   ├── Entities/
│   │   └── Enums/
│   ├── Repositories/
│   │   ├── Interfaces/
│   │   └── Implementations/
│   ├── Services/
│   │   ├── Interfaces/
│   │   └── Implementations/
│   ├── Program.cs
│   ├── appsettings.json
│   └── TicketManagement.API.csproj
│
├── TicketManagementUI/
│   ├── public/
│   ├── src/
│   │   └── app/
│   │       ├── login/
│   │       ├── register/
│   │       ├── dashboard/
│   │       ├── create-ticket/
│   │       ├── ticket-details/
│   │       ├── update-ticket/
│   │       └── services/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md

REST API Endpoints

Authentication

Method

Endpoint

Description

POST

/api/Auth/register

Register Employee/Solver

POST

/api/Auth/login

Login and receive JWT

Tickets

Method

Endpoint

Description

GET

/api/Tickets

Get tickets

GET

/api/Tickets/{id}

Get ticket details

POST

/api/Tickets

Create a ticket

PUT

/api/Tickets/{id}

Update a ticket

PUT

/api/Tickets/{id}/assign

Assign a Solver

PUT

/api/Tickets/{id}/status

Change ticket status

POST

/api/Tickets/{id}/comments

Add a comment

GET

/api/Tickets/{id}/activity

Get comments and status history

Database

The application uses Microsoft SQL Server with Entity Framework Core Code First.

Main entities:

User

Ticket

TicketComment

TicketStatusHistory

The database relationships support:

Ticket creator

Assigned solver

Ticket comments

Ticket status history

EF Core migrations are included in the backend project.

Authentication Flow

User
 │
 ├── Register
 │       ↓
 │   Password Hashing
 │       ↓
 │     Database
 │
 └── Login
         ↓
    Verify Password
         ↓
      JWT Token
         ↓
     Angular App
         ↓
 Authorization: Bearer <token>
         ↓
 ASP.NET Core API

The Angular application stores the JWT token locally and sends it with authenticated API requests.

Role Permissions

Feature

Employee

Solver

Admin

Register

Yes

Yes

No

Login

Yes

Yes

Yes

Create Ticket

Yes

Yes

Yes

View Tickets

Yes

Yes

Yes

Update Own/Assigned Ticket

Yes

Yes

Yes

Assign Solver

No

No

Yes

Change Status

No

Yes

Yes

Add Comment

Yes

Yes

Yes

View Activity

Yes

Yes

Yes

Running the Backend

Prerequisites

.NET 8 SDK

SQL Server / SQL Server Express

Visual Studio 2022 or another .NET-compatible IDE

Configure Database

Update the SQL Server connection string in:

TicketManagementAPI/appsettings.json

Example:

"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=TicketManagementDb;Trusted_Connection=True;TrustServerCertificate=True"
}

Configure JWT

Use a development secret through User Secrets or environment variables. Do not commit a real production JWT secret to GitHub.

Run migrations

From the API project directory:

dotnet ef database update

Run the API

dotnet run

Swagger will be available through the HTTPS URL shown by the application.

Running the Angular Frontend

Prerequisites

Node.js

npm

Angular CLI

Install dependencies:

cd TicketManagementUI
npm install

Start the Angular application:

ng serve

Open:

http://localhost:4200

Make sure the backend API is running before using the application.

Example User Flow

Register as an Employee or Solver.

Login.

Employee creates a ticket.

Admin assigns the ticket to a Solver.

Solver views the assigned ticket.

Solver updates the ticket status.

Users can add comments.

Ticket status changes are stored in the status history.

Admin/Solver can close or reject the ticket with resolution notes.

Error Handling

The API uses a common response structure:

{
  "status": "Success",
  "message": "Operation completed successfully",
  "data": {}
}

This provides a consistent response format between the Angular frontend and ASP.NET Core backend.

Async Programming

The backend uses asynchronous programming with async / await and Task for database operations such as:

Reading tickets

Creating tickets

Updating tickets

Adding comments

Loading activity

Saving changes

This helps avoid blocking the web server while waiting for database operations.

Security Notes

Passwords are stored as hashes, not plain text.

JWT authentication protects ticket APIs.

Role-based authorization restricts administrative operations.

Admin registration is disabled through the public registration endpoint.

A real production JWT secret should never be committed to a public repository.

Connection strings and secrets should be managed through environment variables or .NET User Secrets for production.

Future Improvements

Possible enhancements include:

Refresh tokens

Pagination and filtering

Ticket search

Email notifications

File attachments

Dashboard statistics

Automated unit and integration tests

Docker support

CI/CD pipeline

Production deployment

Author

Chiranjeevi A C

GitHub: https://github.com/ChiranjeeviAC

Assignment Repository

The complete full-stack project is available here:

https://github.com/ChiranjeeviAC/TicketManagementSystem
