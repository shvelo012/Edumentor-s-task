import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export interface Stage {
  title: string;
  description: string;
  durationWeeks?: number;
  resources?: string[];
  prerequisites?: string[];
}

export interface Syllabus {
  skill: string;
  totalWeeks?: number;
  stages: Stage[];
}

export async function generateSyllabusFromAnthropic(skill: string): Promise<Syllabus> {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("Missing ANTHROPIC_API_KEY in .env");

  const model = "claude-3-7-sonnet-20250219";

  const prompt = `
Create a JSON syllabus for learning "${skill}".
Include a top-level field "skill" with the skill name.
Include 4-12 stages. Each stage should have:
- title
- description
- optional durationWeeks
- optional prerequisites (array)

Return **only valid JSON**, no markdown or extra text.
`;


  const res = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1200,
      temperature: 0.2,
    },
    {
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      timeout: 30000,
    }
  );

  const content = res.data?.content?.[0]?.text ?? res.data?.text ?? "";
  console.log(content)

  let parsed: Syllabus | null = null;
  try {
    parsed = JSON.parse(content);
  } catch {
    const first = content.indexOf("{");
    const last = content.lastIndexOf("}");
    if (first !== -1 && last !== -1) parsed = JSON.parse(content.slice(first, last + 1));
  }

  if (!parsed) throw new Error("Failed to parse JSON from Anthropic output");
  return parsed;
}

