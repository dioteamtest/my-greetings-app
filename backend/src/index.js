import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";
const API_KEY = process.env.API_KEY || "dev-only-key";

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN === "*" ? true : FRONTEND_ORIGIN,
    credentials: false,
  })
);

const greetings = [
  "Hello!",
  "Kumusta!",
  "Magandang araw!",
  "Yo! 👋",
  "Good vibes only ✨",
];

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/api/greetings", (req, res) => {
  res.json({ count: greetings.length, greetings });
});

app.get("/api/greetings/random", (req, res) => {
  const headerKey = req.header("x-api-key");
  if (!headerKey || headerKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const random = greetings[Math.floor(Math.random() * greetings.length)];
  res.json({ greeting: random });
});

app.listen(PORT, () => console.log(`Backend listening on :${PORT}`));
