import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSyllabus } from "../lib/api";
import type { Syllabus } from "../types";

export default function SyllabusPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Syllabus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getSyllabus(id)
      .then(setData)
      .catch((err) => setError(err.message || "Failed to load syllabus"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div>Not found</div>;

  return (
    <section>
      <h1>{data.skill}</h1>
      <p className="muted">
        {data.totalWeeks || "?"} weeks
      </p>

      <h2>Learning Path</h2>
      <ol>
        {data.stages.map((stage, idx) => (
          <li key={idx}>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
            {stage.durationWeeks && <p>Duration: {stage.durationWeeks} weeks</p>}
            {stage.prerequisites && stage.prerequisites.length > 0 && (
              <p>Prerequisites: {stage.prerequisites.join(", ")}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
