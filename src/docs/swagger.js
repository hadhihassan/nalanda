// docs/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nalanda API Documentation",
      version: "1.0.0",
      description: "API documentation for Nalanda project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [], // No inline route comments
};

// Manually define all paths in one place
const swaggerSpec = {
  ...swaggerJsdoc(options),
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password", "confirmPassword"],
                properties: {
                  name: { type: "string", example: "John Doe" },
                  email: { type: "string", example: "john@example.com" },
                  password: { type: "string", example: "password123" },
                  confirmPassword: { type: "string", example: "password123" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Successfully registered" },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error or email exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    errors: {
                      type: "array",
                      items: { type: "object", properties: { message: { type: "string", example: "Email already exists" } } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/login": {
      post: {
        tags: ["Auth"],
        summary: "Login a regular user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "john@example.com" },
                  password: { type: "string", example: "password123" },
                },
              },
            },
          },
        },
        responses: {
          202: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Login Successful" },
                    token: { type: "string", example: "JWT_TOKEN" },
                    userName: { type: "string", example: "John Doe" },
                  },
                },
              },
            },
          },
          401: {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    errors: {
                      type: "array",
                      items: { type: "object", properties: { message: { type: "string", example: "Invalid credentials" } } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/admin/login": {
      post: {
        tags: ["Auth"],
        summary: "Login as admin",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "admin@example.com" },
                  password: { type: "string", example: "admin123" },
                },
              },
            },
          },
        },
        responses: {
          202: {
            description: "Admin login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Admin Login Successful" },
                    token: { type: "string", example: "JWT_TOKEN" },
                    userName: { type: "string", example: "Admin User" },
                  },
                },
              },
            },
          },
          401: {
            description: "Invalid admin credentials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    errors: {
                      type: "array",
                      items: { type: "object", properties: { message: { type: "string", example: "Invalid credentials or not admin" } } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/books": {
      get: {
        tags: ["Books"],
        summary: "List all books",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of all books",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    body: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: { type: "string", example: "64ff..." },
                          title: { type: "string", example: "The Alchemist" },
                          author: { type: "string", example: "Paulo Coelho" },
                          ISBN: { type: "string", example: "978-0061122415" },
                          publicationDate: { type: "string", example: "1988-05-01T00:00:00.000Z" },
                          genre: { type: "string", example: "Fiction" },
                          copies: { type: "number", example: 5 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized, token missing or invalid"
          },
        },
      },
      post: {
        tags: ["Books"],
        summary: "Create a new book",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "author", "ISBN", "publicationDate", "genre", "copies"],
                properties: {
                  title: { type: "string", example: "The Alchemist" },
                  author: { type: "string", example: "Paulo Coelho" },
                  ISBN: { type: "string", example: "978-0061122415" },
                  publicationDate: { type: "string", example: "1988-05-01T00:00:00.000Z" },
                  genre: { type: "string", example: "Fiction" },
                  copies: { type: "number", example: 5 },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Book created successfully" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized, admin only" },
        },
      },
    },

    "/books/{id}": {
      delete: {
        tags: ["Books"],
        summary: "Delete a book by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Book ID to delete",
          },
        ],
        responses: {
          200: { description: "Book deleted successfully" },
          400: { description: "Invalid book ID" },
          401: { description: "Unauthorized, admin only" },
        },
      },
      patch: {
        tags: ["Books"],
        summary: "Edit a book by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Book ID to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Updated Book Title" },
                  author: { type: "string", example: "Updated Author" },
                  ISBN: { type: "string", example: "978-0061122415" },
                  publicationDate: { type: "string", example: "1988-05-01T00:00:00.000Z" },
                  genre: { type: "string", example: "Fiction" },
                  copies: { type: "number", example: 5 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Book updated successfully" },
          400: { description: "Invalid request or validation error" },
          401: { description: "Unauthorized, admin only" },
        },
      },
    },

    "/borrow": {
      post: {
        tags: ["Borrow"],
        summary: "Borrow a book",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["bookId", "returnDate"],
                properties: {
                  bookId: { type: "string", example: "64ffabcd1234abcd5678efgh" },
                  returnDate: { type: "string", format: "date", example: "2025-09-10" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Book borrowed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Borrow created successfully." },
                    borrow: {
                      type: "object",
                      properties: {
                        _id: { type: "string", example: "64ffabcd1234abcd5678efgh" },
                        user: { type: "string", example: "64ffaa1234abcd5678efgh" },
                        book: { type: "string", example: "64ffabcd1234abcd5678efgh" },
                        returnDate: { type: "string", format: "date", example: "2025-09-10" },
                        isReturned: { type: "boolean", example: false },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error or book unavailable",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Book not available" },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized, user token required",
          },
        },
      },
    },

    "/return/{id}": {
      patch: {
        tags: ["Borrow"],
        summary: "Return a borrowed book",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Borrow record ID",
          },
        ],
        responses: {
          200: {
            description: "Book returned successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Book returned successfully." },
                    borrow: { type: "object" },
                  },
                },
              },
            },
          },
          400: { description: "Invalid borrow ID" },
          401: { description: "Unauthorized, user token required" },
          404: { description: "Borrow record not found" },
        },
      },
    },

    "/borrow-history": {
      get: {
        tags: ["Borrow"],
        summary: "Get borrow history for the logged-in user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Borrow history retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Borrow history retrieved successfully." },
                    borrows: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string", example: "The Alchemist" },
                          author: { type: "string", example: "Paulo Coelho" },
                          genre: { type: "string", example: "Fiction" },
                          borrowDate: { type: "string", format: "date", example: "2025-08-25T12:00:00.000Z" },
                          returnDate: { type: "string", format: "date", example: "2025-09-10" },
                          isReturned: { type: "boolean", example: false },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized, user token required" },
          404: { description: "No borrow history found" },
        },
      },
    },

     "/most-borrow-books": {
      get: {
        tags: ["Reports"],
        summary: "Get the most borrowed books",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Most borrowed books retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Most borrow books." },
                    borrow: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          borrowCount: { type: "number", example: 5 },
                          book: {
                            type: "object",
                            properties: {
                              title: { type: "string", example: "The Alchemist" },
                              author: { type: "string", example: "Paulo Coelho" },
                              genre: { type: "string", example: "Fiction" },
                              ISBN: { type: "string", example: "1234567890" },
                              copies: { type: "number", example: 3 },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized, user token required" },
        },
      },
    },

    "/active-user": {
      get: {
        tags: ["Reports"],
        summary: "Get active members based on borrow count",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Active members retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Active users." },
                    borrow: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          borrowCount: { type: "number", example: 5 },
                          user: {
                            type: "object",
                            properties: {
                              _id: { type: "string", example: "64ffaa1234abcd5678efgh" },
                              name: { type: "string", example: "John Doe" },
                              email: { type: "string", example: "john@example.com" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized, user token required" },
        },
      },
    },

    "/books-availability": {
      get: {
        tags: ["Reports"],
        summary: "Get books availability status",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Books availability retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Books availability." },
                    totalBooks: { type: "number", example: 100 },
                    borrowedBooks: { type: "number", example: 40 },
                    availableBooks: { type: "number", example: 60 },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized, user token required" },
        },
      },
    },
  },
};

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerSpec;
