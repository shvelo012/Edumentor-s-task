const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:4000";

export async function createSyllabus(skill: string) {
  const res = await fetch(`${API}/api/syllabus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skill }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getSyllabus(id: string | number) {
  const res = await fetch(`${API}/api/syllabus/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listSyllabi() {
  const res = await fetch(`${API}/api/syllabus`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
