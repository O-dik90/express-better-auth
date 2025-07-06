import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import  { auth } from "./auth.js";
import cors from "cors";
import masterRouter from "src/routes/master_route.js";

const PORT = process.env.PORT || 5003;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});