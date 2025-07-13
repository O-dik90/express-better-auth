import { components } from "./component.js";
import { masterPaths } from "./paths/master.js";


export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Express Better Auth API',
    version: '1.0.0',
    description: 'API documentation for Express.js application with Better Auth integration',
    contact: {
      name: 'API Support',
      email: 'support@example.com',
    },
  },
  servers: [
    {
      url: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5003}`,
      description: 'Development server',
    },
  ],
  tags: [
    { name: "Master", description: "Master Base Proposal" },
  ],
  components,
  paths: {
    ...masterPaths,
  },
};
