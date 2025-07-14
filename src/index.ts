import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import  { auth } from "./auth.js";
import cors from "cors";
import masterRouter from "src/routes/master-route.js";
import userRoute from "src/routes/user.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/index.js";

const PORT = process.env.PORT || 5003;
const HOST = process.env.HOST || "localhost";
const TIME = new Date().toLocaleString();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Express Better Auth API Documentation"
}));

app.get("/", (req, res) => {
  res.json({ msg: "better-auth express-js typescript swagger docs"});
});

// Better Auth handler - must be before express.json()
app.all("/api/auth/{*any}", toNodeHandler(auth));

// Don’t use express.json() before the Better Auth handler. Use it only for other routes, or the client API will get stuck on "pending".
app.use(express.json());
app.use(masterRouter);
app.use(userRoute);

const server = app.listen(PORT, () => {
  const startTime = TIME;
  console.log(`🟢 Server started at ${startTime}`);
  console.log(`🚀 Listening at: http://${HOST}:${PORT}`);
  console.log(`📚 API Documentation: http://${HOST}:${PORT}/api-docs`);
});

// Handle server stop (Ctrl+C)
process.on("SIGINT", () => {
  const stopTime = TIME;
  console.log(`\n🛑 Server stopped at ${stopTime}`);
  server.close(() => {
    process.exit(0);
  });
});