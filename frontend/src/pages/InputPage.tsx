import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSyllabus, listSyllabi } from "../lib/api";
import type { Syllabus } from "../types";
import HistoryList from "../shared/HistoryList";
import SkillForm from "../shared/SkillForm";


export default function InputPage({ showHistoryOnly = false }: { showHistoryOnly?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Syllabus[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listSyllabi()
      .then(setHistory)
      .catch(() => setHistory([]));
  }, []);

  async function handleGenerate(skill: string) {
    setError(null);
    setLoading(true);
    try {
      const result = await createSyllabus(skill);
      navigate(`/syllabus/${result.id}`, { state: { data: result } });
    } catch (err: any) {
      setError(err.message || "Failed to generate syllabus");
    } finally {
      setLoading(false);
    }
  }

  if (showHistoryOnly) {
    return (
      <section>
        <h1>Recent Syllabi</h1>
        <HistoryList items={history} onOpen={(id) => navigate(`/syllabus/${id}`)} />
      </section>
    );
  }

  return (
    <section>
      <div className="hero card">
        <h1>Generate a Learning Path</h1>
        <p className="muted">Type any skill (e.g. programming, cooking, chess) and click <strong>Generate Syllabus</strong>.</p>

        <SkillForm onGenerate={handleGenerate} disabled={loading} />

        {error && <div role="alert" className="error">{error}</div>}
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>Recent</h2>
        <HistoryList items={history} onOpen={(id) => navigate(`/syllabus/${id}`)} />
      </div>
    </section>
  );
}
