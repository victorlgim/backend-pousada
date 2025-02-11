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
  },
  apis: ["./src/presentation/routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => { 
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📄 Swagger API Docs disponível em: ${process.env.API_BASE_URL}/docs`);
};
