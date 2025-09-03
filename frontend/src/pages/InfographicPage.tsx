import  { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getSyllabus } from "../lib/api";
import type { Syllabus } from "../types";
import Infographic from "../shared/Infographic";
import StageList from "../shared/StageLIst";

export default function InfographicPage() {
  const { id } = useParams();
  const loc = useLocation();
  const [syllabus, setSyllabus] = useState<Syllabus | null>(loc.state?.data ?? null);
  const [loading, setLoading] = useState(!syllabus);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (syllabus) return;
    if (!id) return setError("Missing id");
    setLoading(true);
    getSyllabus(id)
      .then((d) => {
        const stages = typeof d.stages === "string" ? JSON.parse(d.stages) : d.stages;
        setSyllabus({ ...d, stages });
      })
      .catch((e) => setError(e.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="card">Loading...</div>;
  if (error) return <div role="alert" className="error">{error}</div>;
  if (!syllabus) return <div className="card">No syllabus found.</div>;

  return (
    <section>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12}}>
        <h1>{syllabus.skill}</h1>
        <Link to="/" className="link-button">New</Link>
      </div>

      <div className="card">
        <Infographic syllabus={syllabus} />
      </div>

      <div style={{marginTop: 16}}>
        <h2>Stages</h2>
        <StageList stages={syllabus.stages} />
      </div>
    </section>
  );
}
