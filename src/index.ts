import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import  { auth } from "./auth.js";
import cors from "cors";
import masterRouter from "src/routes/master_route.js";

const PORT = process.env.PORT || 5003;
const HOST = process.env.HOST || "localhost";
const TIME = new Date().toLocaleString();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
// Don’t use express.json() before the Better Auth handler. Use it only for other routes, or the client API will get stuck on "pending".
app.use(express.json());
app.get("/", (req, res) => {
  res.send("better-auth express-js typescript");
});
app.use(masterRouter)

const server = app.listen(PORT, () => {
  const startTime = TIME;
  console.log(`🟢 Server started at ${startTime}`);
  console.log(`🚀 Listening at: http://${HOST}:${PORT}`);
});

// Handle server stop (Ctrl+C)
process.on("SIGINT", () => {
  const stopTime = TIME;
  console.log(`\n🛑 Server stopped at ${stopTime}`);
  server.close(() => {
    process.exit(0);
  });
});