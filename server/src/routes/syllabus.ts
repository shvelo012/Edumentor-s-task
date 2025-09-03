import { Router } from "express";
import { generateSyllabusFromAnthropic, Syllabus } from "../services/anthropic";
import { SyllabusModel } from "../models/models";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const skill = String(req.body.skill || "").trim();
    if (!skill) return res.status(400).json({ error: "Missing skill" });

    const generated: Syllabus = await generateSyllabusFromAnthropic(skill);

    const saved = await SyllabusModel.create({
      skill: generated.skill,
      totalWeeks: generated.totalWeeks ?? null,
      stages: generated.stages,
    });

    res.json(saved);
  } catch (err: any) {
    console.error("POST /api/syllabus error:", err.response?.data || err.message || err);
    res.status(err.response?.status || 500).json({ error: err.response?.data || err.message || "Failed to generate syllabus" });
  }
});

router.get("/", async (_req, res) => {
  try {
    const rows = await SyllabusModel.findAll({ order: [["createdAt", "DESC"]] });
    res.json(rows);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to fetch syllabi" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const row = await SyllabusModel.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Syllabus not found" });
    res.json(row);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to fetch syllabus" });
  }
});

export default router;
