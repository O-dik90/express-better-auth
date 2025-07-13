export const components = {
  schemas: {
    Master: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        category: { type: "string" },
        description: { type: "string" },
      },
    },
    Error: {
      type: "object",
      properties: {
        message: { type: "string" },
        status: { type: "number" },
      },
    },
  },
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
    },
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "token",
    },
  },
};
