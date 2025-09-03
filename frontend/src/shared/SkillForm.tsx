import React, { useState } from "react";

export default function SkillForm({ onGenerate, disabled = false }: { onGenerate: (skill: string) => void; disabled?: boolean; }) {
  const [skill, setSkill] = useState("");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const s = skill.trim();
    if (!s) return;
    onGenerate(s);
    setSkill("");
  }

  return (
    <form onSubmit={submit} className="skill-form" aria-label="Generate syllabus form">
      <label htmlFor="skill" className="visually-hidden">Skill to learn</label>
      <input
        id="skill"
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder='e.g. "programming", "cooking"'
        aria-label="Skill name"
        autoComplete="off"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !skill.trim()}>
        {disabled ? "Generating..." : "Generate Syllabus"}
      </button>
    </form>
  );
}
