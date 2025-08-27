# Nalanda Library Management System Task


## Overview

Nalanda Library Management System is designed to streamline the management of a library's backend operations. It encompasses functionalities for user management, book handling, borrowing system, and report generation, offering both RESTful and GraphQL APIs for comprehensive interaction.

## Features

- **User Management**: Registration, login, and role-based access (Admin, Member).

- **Book Management**:  Add, update, delete, and list books with pagination and filters.

- **Borrowing System**: Borrow, return books, and view borrowing history.

- **Reports**: Most borrowed books, active members, and book availability.


## Project Structure

The project is organized root main folders:

- **`src/`**: Backend code including models, models, routes, GraphQL schemas, and controllers.

## Setup Instructions

1. Clone the Repository

```bash
     git clone https://github.com/your-username/Nalanda-Library-Management-System.git
```


2. Install dependencies:
    ```bash
       cd Nalanda-Library-Management-System/src
       npm install
    ```
    
3. Start the server:
    ```bash
       npm start
    ```

## Environment Variables

Set up the environment variables in the `.env` files for  server.

### server (`.env`)

   ```bash
   
PORT=http://your_server_url

MONGO_URL=YOUR_MONGO_URL

JWT_SECRET_KEY=YOUR_JWT_SECRET
```


## API Documentations


REST API Documentation

```bash
   https://nalanda-sewu.onrender.com/api-docs
```

GraphQl API Documentation

```bash
   https://nalanda-sewu.onrender.com/graphql
```
