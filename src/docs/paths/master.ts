import { minimum } from "zod/mini";

export const masterPaths = {
  "/create-master": {
    post: {
      tags: ["Master"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                category: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Create Master successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Master" },
            },
          },
        },
        404: {
          description: "Not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
  "/get-list-master": {
    get: {
      tags: ["Master"],
      parameters: [
        {
          name: "keyword",
          in: "query",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "page",
          in: "query",
          required: true,
          schema: { type: "number", minimum: 1, default: 1 },
        },
        {
          name: "page_size",
          in: "query",
          required: true,
          schema: { type: "number", minimum: 10, default: 10 },
        },
        {
          name: "sort",
          in: "query",
          required: false,
          schema: { type: "string", enum: ["asc", "desc"], default: "desc" },
        }
      ],
      responses: {
        200: {
          description: "List Master",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Master" },
                  },
                  total: { type: "number" },
                },
              },
            },
          },
        },
      },
    },
  },
  "/get-master/{id}": {
    get: {
      tags: ["Master"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Master detail",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Master" },
            },
          },
        },
      },
    },
  },
  "/update-master/{id}": {
    put: {
      tags: ["Master"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                category: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Update Master successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Master" },
            },
          },
        },
      },
    },
  },
  "/delete-master/{id}": {
    delete: {
      tags: ["Master"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Delete Master successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Master" },
            },
          },
        },
      },
    }
  }
};
