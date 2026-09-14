"use client";

import { useState, useEffect } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

// ── Auth ───────────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAction(api.auth.login);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = await login({ password });
      onLogin(token);
    } catch {
      setError("Invalid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-sky-950">Admin Login</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-950"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-950 text-white py-2 rounded-lg hover:bg-sky-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────────────

const TITLE_OPTIONS = [
  "Professor",
  "Lab manager",
  "Lab technician",
  "Doctoral candidate",
  "Post doctoral researcher",
  "Visiting PhD student",
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

const input = "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-950";
const btn = "px-4 py-2 rounded-lg text-sm font-medium transition-colors";
const btnPrimary = `${btn} bg-sky-950 text-white hover:bg-sky-800`;
const btnSecondary = `${btn} border border-gray-300 hover:bg-gray-50`;
const btnDanger = `${btn} text-red-600 hover:bg-red-50`;

// ── Team ───────────────────────────────────────────────────────────────────────

type TeamMember = {
  _id: Id<"team">;
  name: string;
  otherNames?: string[];
  prefix?: string;
  title: string;
  image?: string;
  imageUrl?: string | null;
  email: string;
  telephone?: string;
  isAlumni?: boolean;
  isVisiting?: boolean;
  sortOrder?: number;
};

const emptyMember = {
  name: "", otherNames: "", prefix: "", title: "Doctoral candidate",
  email: "", telephone: "", isAlumni: false, isVisiting: false, sortOrder: 0,
};

function TeamAdmin({ token }: { token: string }) {
  const members = useQuery(api.team.list) ?? [];
  const createMember = useMutation(api.team.create);
  const updateMember = useMutation(api.team.update);
  const removeMember = useMutation(api.team.remove);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyMember);
  const [uploading, setUploading] = useState(false);
  const [imageStorageId, setImageStorageId] = useState<string>("");

  const openAdd = () => { setEditing(null); setForm(emptyMember); setImageStorageId(""); };
  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name, otherNames: (m.otherNames ?? []).join(", "),
      prefix: m.prefix ?? "", title: m.title, email: m.email,
      telephone: m.telephone ?? "", isAlumni: m.isAlumni ?? false,
      isVisiting: m.isVisiting ?? false, sortOrder: m.sortOrder ?? 0,
    });
    setImageStorageId(m.image ?? "");
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const uploadUrl = await generateUploadUrl({ token });
    const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = await res.json();
    setImageStorageId(storageId);
    setUploading(false);
  };

  const save = async () => {
    const data = {
      token,
      name: form.name,
      otherNames: form.otherNames ? form.otherNames.split(",").map(s => s.trim()).filter(Boolean) : undefined,
      prefix: form.prefix || undefined,
      title: form.title,
      email: form.email,
      telephone: form.telephone || undefined,
      isAlumni: form.isAlumni,
      isVisiting: form.isVisiting,
      sortOrder: form.sortOrder,
      image: imageStorageId || undefined,
    };
    if (editing) {
      await updateMember({ ...data, id: editing._id });
    } else {
      await createMember(data);
    }
    setEditing(undefined as any);
    setForm(emptyMember);
  };

  const showForm = editing !== undefined;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <button className={btnPrimary} onClick={openAdd}>+ Add member</button>
      </div>

      {showForm && (
        <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
          <h3 className="font-semibold">{editing ? "Edit member" : "New member"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name *"><input className={input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></Field>
            <Field label="Prefix (e.g. Prof. Dr.)"><input className={input} value={form.prefix} onChange={e => setForm(f => ({ ...f, prefix: e.target.value }))} /></Field>
            <Field label="Title *">
              <select className={input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}>
                {TITLE_OPTIONS.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Other names (comma-separated)"><input className={input} value={form.otherNames} onChange={e => setForm(f => ({ ...f, otherNames: e.target.value }))} /></Field>
            <Field label="Email *"><input className={input} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></Field>
            <Field label="Telephone"><input className={input} value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))} /></Field>
            <Field label="Sort order"><input className={input} type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))} /></Field>
            <Field label="Photo">
              <input type="file" accept="image/*" className="text-sm" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
              {uploading && <p className="text-xs text-gray-500">Uploading…</p>}
              {imageStorageId && !uploading && <p className="text-xs text-green-600">✓ Photo set</p>}
            </Field>
          </div>
          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isAlumni} onChange={e => setForm(f => ({ ...f, isAlumni: e.target.checked }))} /> Alumni</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isVisiting} onChange={e => setForm(f => ({ ...f, isVisiting: e.target.checked }))} /> Visiting</label>
          </div>
          <div className="flex gap-3">
            <button className={btnPrimary} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={() => setEditing(undefined as any)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="pl-4 py-3 text-left">Name</th>
              <th className="pl-4 py-3 text-left">Title</th>
              <th className="pl-4 py-3 text-left">Email</th>
              <th className="py-3"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id} className="border-t hover:bg-gray-50">
                <td className="pl-4 py-3 font-medium flex items-center gap-2">
                  {m.imageUrl && <img src={m.imageUrl} className="w-7 h-7 rounded-full object-cover" />}
                  {m.name} {m.isAlumni && <span className="text-xs bg-gray-100 px-1 rounded">Alumni</span>}
                </td>
                <td className="pl-4 py-3 text-gray-500">{m.title}</td>
                <td className="pl-4 py-3 text-gray-500">{m.email}</td>
                <td className="pr-4 py-3 flex gap-2 justify-end">
                  <button className={btnSecondary} onClick={() => openEdit(m)}>Edit</button>
                  <button className={btnDanger} onClick={() => removeMember({ token, id: m._id })}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Publications ───────────────────────────────────────────────────────────────

type Publication = {
  _id: Id<"publications">;
  title: string; journal: string; link: string;
  year: number; authors: string[]; abstract?: string;
};

const emptyPub = { title: "", journal: "", link: "", year: new Date().getFullYear(), authors: "", abstract: "" };

function PublicationsAdmin({ token }: { token: string }) {
  const publications = useQuery(api.publications.list) ?? [];
  const createPub = useMutation(api.publications.create);
  const updatePub = useMutation(api.publications.update);
  const removePub = useMutation(api.publications.remove);

  const [editing, setEditing] = useState<Publication | null | undefined>(undefined);
  const [form, setForm] = useState(emptyPub);

  const openAdd = () => { setEditing(null); setForm(emptyPub); };
  const openEdit = (p: Publication) => {
    setEditing(p);
    setForm({ title: p.title, journal: p.journal, link: p.link, year: p.year, authors: p.authors.join("\n"), abstract: p.abstract ?? "" });
  };

  const save = async () => {
    const data = {
      token, title: form.title, journal: form.journal, link: form.link,
      year: Number(form.year), authors: form.authors.split("\n").map(s => s.trim()).filter(Boolean),
      abstract: form.abstract || undefined,
    };
    if (editing) await updatePub({ ...data, id: editing._id });
    else await createPub(data);
    setEditing(undefined);
  };

  const sorted = [...publications].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Publications</h2>
        <button className={btnPrimary} onClick={openAdd}>+ Add publication</button>
      </div>

      {editing !== undefined && (
        <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
          <h3 className="font-semibold">{editing ? "Edit publication" : "New publication"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title *"><input className={input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></Field>
            <Field label="Journal *"><input className={input} value={form.journal} onChange={e => setForm(f => ({ ...f, journal: e.target.value }))} /></Field>
            <Field label="Link *"><input className={input} value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} /></Field>
            <Field label="Year *"><input className={input} type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))} /></Field>
          </div>
          <Field label="Authors (one per line) *">
            <textarea className={`${input} h-32`} value={form.authors} onChange={e => setForm(f => ({ ...f, authors: e.target.value }))} />
          </Field>
          <Field label="Abstract">
            <textarea className={`${input} h-24`} value={form.abstract} onChange={e => setForm(f => ({ ...f, abstract: e.target.value }))} />
          </Field>
          <div className="flex gap-3">
            <button className={btnPrimary} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={() => setEditing(undefined)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 flex justify-between items-start hover:bg-gray-50">
            <div>
              <p className="font-medium text-sm">{p.title}</p>
              <p className="text-xs text-gray-500">{p.journal} · {p.year}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 ml-4">
              <button className={btnSecondary} onClick={() => openEdit(p)}>Edit</button>
              <button className={btnDanger} onClick={() => removePub({ token, id: p._id })}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Research ───────────────────────────────────────────────────────────────────

type ResearchItem = {
  _id: Id<"research">;
  title?: string; textBlocks: string[]; image?: string;
  imageSrc?: string | null; imageAlt?: string; sortOrder?: number;
};

const emptyResearch = { title: "", textBlocks: "", imageAlt: "", sortOrder: 0 };

function ResearchAdmin({ token }: { token: string }) {
  const items = useQuery(api.research.list) ?? [];
  const createItem = useMutation(api.research.create);
  const updateItem = useMutation(api.research.update);
  const removeItem = useMutation(api.research.remove);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const [editing, setEditing] = useState<ResearchItem | null | undefined>(undefined);
  const [form, setForm] = useState(emptyResearch);
  const [imageStorageId, setImageStorageId] = useState("");
  const [uploading, setUploading] = useState(false);

  const openAdd = () => { setEditing(null); setForm(emptyResearch); setImageStorageId(""); };
  const openEdit = (r: ResearchItem) => {
    setEditing(r);
    setForm({ title: r.title ?? "", textBlocks: r.textBlocks.join("\n\n"), imageAlt: r.imageAlt ?? "", sortOrder: r.sortOrder ?? 0 });
    setImageStorageId(r.image ?? "");
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const uploadUrl = await generateUploadUrl({ token });
    const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = await res.json();
    setImageStorageId(storageId);
    setUploading(false);
  };

  const save = async () => {
    const data = {
      token,
      title: form.title || undefined,
      textBlocks: form.textBlocks.split(/\n\n+/).map(s => s.trim()).filter(Boolean),
      image: imageStorageId || undefined,
      imageAlt: form.imageAlt || undefined,
      sortOrder: form.sortOrder,
    };
    if (editing) await updateItem({ ...data, id: editing._id });
    else await createItem(data);
    setEditing(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Research Areas</h2>
        <button className={btnPrimary} onClick={openAdd}>+ Add area</button>
      </div>

      {editing !== undefined && (
        <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
          <h3 className="font-semibold">{editing ? "Edit research area" : "New research area"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title"><input className={input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Leave blank for intro section" /></Field>
            <Field label="Sort order"><input className={input} type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))} /></Field>
          </div>
          <Field label="Text (separate paragraphs with a blank line)">
            <textarea className={`${input} h-48`} value={form.textBlocks} onChange={e => setForm(f => ({ ...f, textBlocks: e.target.value }))} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Image">
              <input type="file" accept="image/*" className="text-sm" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
              {uploading && <p className="text-xs text-gray-500">Uploading…</p>}
              {imageStorageId && !uploading && <p className="text-xs text-green-600">✓ Image set</p>}
            </Field>
            <Field label="Image alt text"><input className={input} value={form.imageAlt} onChange={e => setForm(f => ({ ...f, imageAlt: e.target.value }))} /></Field>
          </div>
          <div className="flex gap-3">
            <button className={btnPrimary} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={() => setEditing(undefined)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((r) => (
          <div key={r._id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
            <p className="font-medium text-sm">{r.title || <span className="text-gray-400 italic">Intro section</span>}</p>
            <div className="flex gap-2">
              <button className={btnSecondary} onClick={() => openEdit(r)}>Edit</button>
              <button className={btnDanger} onClick={() => removeItem({ token, id: r._id })}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Open Positions ─────────────────────────────────────────────────────────────

type OpenPosition = {
  _id: Id<"openPositions">;
  title: string; description: string; requirements: string[];
  responsibilities: string[]; location: string; type: string;
  duration?: string; isActive: boolean;
};

const emptyPosition = {
  title: "", description: "", requirements: "", responsibilities: "",
  location: "Davos, Switzerland", type: "PhD", duration: "", isActive: false,
};

function OpenPositionsAdmin({ token }: { token: string }) {
  const positions = useQuery(api.openPositions.list) ?? [];
  const createPos = useMutation(api.openPositions.create);
  const updatePos = useMutation(api.openPositions.update);
  const removePos = useMutation(api.openPositions.remove);

  const [editing, setEditing] = useState<OpenPosition | null | undefined>(undefined);
  const [form, setForm] = useState(emptyPosition);

  const openAdd = () => { setEditing(null); setForm(emptyPosition); };
  const openEdit = (p: OpenPosition) => {
    setEditing(p);
    setForm({
      title: p.title, description: p.description,
      requirements: p.requirements.join("\n"), responsibilities: p.responsibilities.join("\n"),
      location: p.location, type: p.type, duration: p.duration ?? "", isActive: p.isActive,
    });
  };

  const save = async () => {
    const data = {
      token, title: form.title, description: form.description,
      requirements: form.requirements.split("\n").map(s => s.trim()).filter(Boolean),
      responsibilities: form.responsibilities.split("\n").map(s => s.trim()).filter(Boolean),
      location: form.location, type: form.type,
      duration: form.duration || undefined, isActive: form.isActive,
    };
    if (editing) await updatePos({ ...data, id: editing._id });
    else await createPos(data);
    setEditing(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Open Positions</h2>
        <button className={btnPrimary} onClick={openAdd}>+ Add position</button>
      </div>

      {editing !== undefined && (
        <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
          <h3 className="font-semibold">{editing ? "Edit position" : "New position"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title *"><input className={input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></Field>
            <Field label="Type"><input className={input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} placeholder="PhD, Postdoc…" /></Field>
            <Field label="Location"><input className={input} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></Field>
            <Field label="Duration"><input className={input} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 3-4 years" /></Field>
          </div>
          <Field label="Description *">
            <textarea className={`${input} h-24`} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </Field>
          <Field label="Requirements (one per line)">
            <textarea className={`${input} h-32`} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} />
          </Field>
          <Field label="Responsibilities (one per line)">
            <textarea className={`${input} h-32`} value={form.responsibilities} onChange={e => setForm(f => ({ ...f, responsibilities: e.target.value }))} />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
            Show on website (active)
          </label>
          <div className="flex gap-3">
            <button className={btnPrimary} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={() => setEditing(undefined)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {positions.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {p.isActive ? "Active" : "Hidden"}
              </span>
              <p className="font-medium text-sm">{p.title}</p>
            </div>
            <div className="flex gap-2">
              <button className={btnSecondary} onClick={() => openEdit(p)}>Edit</button>
              <button className={btnDanger} onClick={() => removePos({ token, id: p._id })}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main admin page ────────────────────────────────────────────────────────────

const TABS = ["Team", "Publications", "Research", "Open Positions"] as const;
type Tab = typeof TABS[number];

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("Team");
  const logout = useMutation(api.auth.logout);

  useEffect(() => {
    setToken(localStorage.getItem("admin_token"));
  }, []);

  const handleLogin = (t: string) => {
    localStorage.setItem("admin_token", t);
    setToken(t);
  };

  const handleLogout = async () => {
    if (token) await logout({ token });
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  if (!token) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-sky-950 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">PPC Admin</h1>
        <button onClick={handleLogout} className="text-sm opacity-70 hover:opacity-100">Log out</button>
      </div>

      <div className="border-b bg-white px-8">
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t ? "border-sky-950 text-sky-950" : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {tab === "Team" && <TeamAdmin token={token} />}
        {tab === "Publications" && <PublicationsAdmin token={token} />}
        {tab === "Research" && <ResearchAdmin token={token} />}
        {tab === "Open Positions" && <OpenPositionsAdmin token={token} />}
      </div>
    </div>
  );
}
