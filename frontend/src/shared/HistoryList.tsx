import type { Syllabus } from "../types";

export default function HistoryList({ items, onOpen }: { items: Syllabus[]; onOpen?: (id: string | number) => void; }) {
  if (!items || items.length === 0) {
    return <div className="muted">No recent syllabi yet.</div>;
  }

  return (
    <div className="history-grid">
      {items.map((item) => (
        <article key={item.id} className="card history-item" tabIndex={0}>
          <div className="history-title">{item.skill}</div>
          <div className="history-actions">
            <button onClick={() => onOpen?.(item.id!)}>Open</button>
          </div>
        </article>
      ))}
    </div>
  );
}
