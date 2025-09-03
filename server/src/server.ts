import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import syllabusRoutes from "./routes/syllabus";
import "./models/models";
import { sequelize } from "./db/db";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/syllabus", syllabusRoutes);

const PORT = Number(process.env.PORT || 4000);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("DB sync failed:", err);
    process.exit(1);
  });
