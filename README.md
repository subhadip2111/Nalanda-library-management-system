# Nalanda Library Management System

## Overview

Nalanda Library Management System is a backend application built with Node.js, Express, MongoDB, and GraphQL. It provides a RESTful API and GraphQL API for managing users, books, borrowing, and other library operations.

## Features

- User Management (Registration, Authentication, Authorization)
- Book Management (Add, Update, Delete, List with Pagination and Filtering)
- Borrowing System (Borrow, Return, Borrow History)
- Reports and Aggregations (Most Borrowed Books, Active Members, Book Availability)

## Tech Stack

- **Node.js**: Backend JavaScript runtime environment.
- **Express**: Web framework for Node.js to handle HTTP requests.
- **MongoDB**: NoSQL database for storing application data.
- **GraphQL**: Query language for APIs to fetch precise data.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating JSON Web Tokens (JWT) for authentication.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your/repository.git
   cd nalanda-library-management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/nalanda-library
   JWT_SECRET=your_secret_key
   ```

   Replace `your_secret_key` with a secure random string for JWT token generation.

4. **Start the server:**

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:3000`.

## API Documentation

### RESTful API Endpoints

- **User Management**
  - `POST /register`: Register a new user.
  - `POST /login`: User login.
  
- **Book Management**
  - `POST /books`: Add a new book.
  - `GET /books`: Get list of books with pagination and filtering.
  - `PUT /books/:id`: Update book details.
  - `DELETE /books/:id`: Delete a book.
  
- **Borrowing System**
  - `POST /borrow`: Borrow a book.
  - `POST /return/:id`: Return a borrowed book.
  - `GET /history`: Get borrow history of the user.

### GraphQL API

Access the GraphQL endpoint at `http://localhost:3000/graphql` for more complex queries and mutations.

## Usage

- Use tools like Postman or curl to test RESTful endpoints.
- Use GraphQL playground (GraphiQL) at `http://localhost:3000/graphql` for interactive testing.

## Security

- JWT-based authentication is implemented for secure user login and role-based access control.

