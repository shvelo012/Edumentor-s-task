import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import type { Syllabus } from "../types";

mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });

function escapeLabel(s: string) {
  return s.replace(/(["\\])/g, "\\$1").replace(/\n/g, "\\n");
}

function toMermaid(syllabus: Syllabus) {
  const nodes = syllabus.stages.map((st, i) => `N${i}["${escapeLabel(st.title)} |   ${st.durationWeeks ?? ''} ${st.durationWeeks ? 'weeks' : ''}"]`);
  const links = syllabus.stages.map((_st, i) => (i < syllabus.stages.length - 1 ? `N${i} --> N${i + 1}` : '')).filter(Boolean);
  const header = `flowchart TD\nclassDef title font-weight:700;\n`;
  return [header, ...nodes, ...links].join("\n");
}

export default function Infographic({ syllabus }: { syllabus: Syllabus }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const code = toMermaid(syllabus);
    const id = "m" + Math.random().toString(36).slice(2);
    mermaid.render(id, code)
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      })
      .catch((err) => {
        if (ref.current) ref.current.innerHTML = `<pre class="error">Failed to render infographic: ${String(err)}</pre>`;
      });
  }, [syllabus]);

  return <div className="infographic" ref={ref} aria-label="Syllabus infographic" />;
}
