import type { Stage } from "../types";

export default function StageList({ stages }: { stages: Stage[] }) {
  return (
    <div className="stages-grid">
      {stages.map((s, i) => (
        <article key={i} className="card stage-card">
          <div className="stage-header">
            <div className="stage-index">{i + 1}</div>
            <div>
              <div className="stage-title">{s.title}</div>
              {s.durationWeeks && <div className="muted small">{s.durationWeeks} week(s)</div>}
            </div>
          </div>
          <p className="muted">{s.description}</p>


          {s.prerequisites?.length ? (
            <div className="muted small">Prerequisites: {s.prerequisites.join(", ")}</div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
