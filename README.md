# Brown Pages Cafe- Full Stack Cafe Management

A full-stack web application for managing a cafe, featuring real-time reservations, event management, and a dynamic menu that allows filtering by category. Built with a Custom Native Node.js Backend (no Express).

## Features:

    Authentication: Secure JWT-based signup/login with role-based access (Admin vs. User).

    Menu Management: Allows filtering by categories.

    Event System: Users can RSVP to upcoming events; Admins can manage event capacity and details.

    Reservations: Conflict-checked booking system for tables and slots.

    Review System: customer feedback and ratings.

## Tech Stack

| Category       | Technologies                   |
| :------------- | :----------------------------- |
| Frontend       | React, CSS                     |
| Backend        | Native http                    |
| Database       | MongoDB + Mongoose             |
| Authentication | JWT (JSON Web Tokens) & Bcrypt |
| File Handling  | Formidable                     |

# Quick Start

1. Clone the repo:

```bash
git clone https://github.com/bitaniya9/Brown-Pages-Cafe.git
```

2. Backend Setup
   Create an env file:

```bash
PORT=port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Install dependencies and start:

```bash
cd backend
npm i
npm run dev
```

3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
