// src/infrastructure/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: process.env.SWAGGER_TITLE || "API",
      version: process.env.SWAGGER_VERSION || "1.0.0",
      description: process.env.SWAGGER_DESCRIPTION || "API Documentation",
    },
    servers: [
      {
        url: process.env.API_BASE_URL || "http://localhost:5000/api",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // ---------- ROOMS ----------
        RoomCategory: {
          type: "string",
          enum: ["Standard", "Chalé", "Luxo"],
          example: "Luxo",
        },
        CreateRoom: {
          type: "object",
          required: ["number", "capacity", "pricePerNight", "category"],
          properties: {
            number: { type: "string", example: "101" },
            capacity: { type: "integer", example: 2 },
            pricePerNight: { type: "number", example: 220 },
            category: { $ref: "#/components/schemas/RoomCategory" },
          },
        },
        UpdateRoom: {
          type: "object",
          required: ["number", "capacity", "pricePerNight", "category"],
          properties: {
            number: { type: "string", example: "202" },
            capacity: { type: "integer", example: 4 },
            pricePerNight: { type: "number", example: 350 },
            category: { $ref: "#/components/schemas/RoomCategory" },
          },
        },
        RoomResponse: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            number: { type: "string", example: "101" },
            capacity: { type: "integer", example: 2 },
            pricePerNight: { type: "number", example: 220 },
            category: { $ref: "#/components/schemas/RoomCategory" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        // ---------- RESERVATIONS ----------
        GuestPayload: {
          type: "object",
          required: ["name", "cpf"],
          properties: {
            name: { type: "string", example: "João da Silva" },
            cpf: { type: "string", example: "12345678901" },
            phone: { type: "string", nullable: true, example: "11999999999" },
            email: { type: "string", nullable: true, example: "joao@email.com" },
          },
        },
        ReservationPayload: {
          type: "object",
          required: ["numberOfGuests", "origin", "checkIn", "checkOut", "roomId"],
          properties: {
            numberOfGuests: { type: "integer", example: 2 },
            origin: { type: "string", example: "Instagram" },
            checkIn: { type: "string", format: "date", example: "2025-09-01" },
            checkOut: { type: "string", format: "date", example: "2025-09-05" },
            roomId: { type: "integer", example: 1 },
            notes: { type: "string", nullable: true, example: "Travesseiro extra" },
          },
        },
        CreateReservation: {
          type: "object",
          required: ["guest", "reservation"],
          properties: {
            guest: { $ref: "#/components/schemas/GuestPayload" },
            reservation: { $ref: "#/components/schemas/ReservationPayload" },
          },
        },

        // ---------- AUTH (opcional, ajuda no Swagger) ----------
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "admin@pousada.com" },
            password: { type: "string", example: "admin123" },
          },
        },
        RegisterUserRequest: {
          type: "object",
          required: ["email", "name", "password"],
          properties: {
            email: { type: "string", example: "user@pousada.com" },
            name: { type: "string", example: "Maria" },
            password: { type: "string", example: "minhaSenha123" },
            role: { type: "string", enum: ["admin", "supervisor", "user"], example: "user" },
          },
        },

        // ---------- ERROS ----------
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Validation error" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/presentation/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  const base = process.env.API_BASE_URL || "http://localhost:5000/api";
  console.log(`📄 Swagger API Docs disponível em: ${base.replace(/\/api$/, "")}/api-docs`);
};
