"use client";

import { useState, useEffect, useRef } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  email: "", telephone: "", isAlumni: false, isVisiting: false, sortOrder: 0, bio: "",
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
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);

  const openAdd = () => { setEditing(null); setForm(emptyMember); setImageStorageId(""); scrollToForm(); };
  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name, otherNames: (m.otherNames ?? []).join(", "),
      prefix: m.prefix ?? "", title: m.title, email: m.email,
      telephone: m.telephone ?? "", isAlumni: m.isAlumni ?? false,
      isVisiting: m.isVisiting ?? false, sortOrder: m.sortOrder ?? 0, bio: (m as any).bio ?? "",
    });
    setImageStorageId(m.image ?? "");
    scrollToForm();
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
      bio: form.bio,
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
        <div ref={formRef} className="border rounded-xl p-6 bg-gray-50 space-y-4">
          <h3 className="font-semibold">{editing ? "Edit member" : "New member"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name *"><input className={input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></Field>
            <Field label="Prefix (e.g. Prof. Dr.)"><input className={input} value={form.prefix} onChange={e => setForm(f => ({ ...f, prefix: e.target.value }))} /></Field>
            <Field label="Title *">
              <input
                className={input}
                list="title-options"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Doctoral candidate"
              />
              <datalist id="title-options">
                {TITLE_OPTIONS.map(t => <option key={t} value={t} />)}
              </datalist>
            </Field>
            <Field label="Other names (comma-separated)">
              <input className={input} value={form.otherNames} onChange={e => setForm(f => ({ ...f, otherNames: e.target.value }))} placeholder="e.g. Christoph B. Messner" />
              <p className="text-xs text-gray-400 mt-1">Names used in publications — these will be bolded in the publications list and shown on their personal page.</p>
            </Field>
            <Field label="Email *"><input className={input} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></Field>
            <Field label="Telephone"><input className={input} value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))} /></Field>
            <Field label="Sort order"><input className={input} type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))} /></Field>
            <Field label="Photo">
              <ImagePicker currentStorageId={imageStorageId} onSelect={setImageStorageId} token={token} />
            </Field>
          </div>
          <Field label="Bio">
            <textarea className={`${input} h-24`} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Short bio shown on the member's personal page" />
          </Field>
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
                  <div className="relative w-7 h-7 flex-shrink-0">
                    <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-semibold">
                      {m.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("")}
                    </div>
                    {(m as any).imageUrl && (
                      <div className="absolute inset-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${(m as any).imageUrl})` }} />
                    )}
                  </div>
                  {m.name} {m.isAlumni && <span className="text-xs bg-gray-100 px-1 rounded">Alumni</span>}
                </td>
                <td className="pl-4 py-3 text-gray-500">{m.title}</td>
                <td className="pl-4 py-3 text-gray-500">{m.email}</td>
                <td className="pr-4 py-3 flex gap-2 justify-end">
                  <button className={btnSecondary} onClick={() => openEdit(m)}>Edit</button>
                  <button className={btnDanger} onClick={() => { if (window.confirm(`Delete ${m.name}?`)) removeMember({ token, id: m._id }); }}>Delete</button>
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
              <button className={btnDanger} onClick={() => { if (window.confirm(`Delete "${p.title}"?`)) removePub({ token, id: p._id }); }}>Delete</button>
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

function SortableResearchRow({ item, onEdit, onDelete }: { item: ResearchItem; onEdit: (r: ResearchItem) => void; onDelete: (id: Id<"research">) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item._id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="border rounded-lg p-4 flex justify-between items-center bg-white hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <button {...attributes} {...listeners} className="cursor-grab text-gray-300 hover:text-gray-400 p-1 touch-none">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>
            <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
            <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
          </svg>
        </button>
        <p className="font-medium text-sm">{item.title || <span className="text-gray-400 italic">Intro section</span>}</p>
      </div>
      <div className="flex gap-2">
        <button className={btnSecondary} onClick={() => onEdit(item)}>Edit</button>
        <button className={btnDanger} onClick={() => onDelete(item._id)}>Delete</button>
      </div>
    </div>
  );
}

function ResearchAdmin({ token }: { token: string }) {
  const items = useQuery(api.research.list) ?? [];
  const createItem = useMutation(api.research.create);
  const updateItem = useMutation(api.research.update);
  const removeItem = useMutation(api.research.remove);
  const reorderItems = useMutation(api.research.reorder);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const [editing, setEditing] = useState<ResearchItem | null | undefined>(undefined);
  const [form, setForm] = useState(emptyResearch);
  const [imageStorageId, setImageStorageId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [localItems, setLocalItems] = useState<ResearchItem[]>([]);
  const [orderSaved, setOrderSaved] = useState(false);

  useEffect(() => { if (items.length) setLocalItems(items); }, [items]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = localItems.findIndex(i => i._id === active.id);
    const newIndex = localItems.findIndex(i => i._id === over.id);
    const reordered = arrayMove(localItems, oldIndex, newIndex);
    setLocalItems(reordered);
    await reorderItems({ token, ids: reordered.map(i => i._id) });
    setOrderSaved(true);
    setTimeout(() => setOrderSaved(false), 2000);
  };

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
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Research Areas</h2>
          {orderSaved && <span className="text-sm text-green-600">Order saved!</span>}
        </div>
        <button className={btnPrimary} onClick={openAdd}>+ Add area</button>
      </div>
      <p className="text-xs text-gray-400">Drag the ⠿ handle to reorder — order saves automatically.</p>

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
              <ImagePicker currentStorageId={imageStorageId} onSelect={setImageStorageId} token={token} />
            </Field>
            <Field label="Image alt text"><input className={input} value={form.imageAlt} onChange={e => setForm(f => ({ ...f, imageAlt: e.target.value }))} /></Field>
          </div>
          <div className="flex gap-3">
            <button className={btnPrimary} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={() => setEditing(undefined)}>Cancel</button>
          </div>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={localItems.map(i => i._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {localItems.map((r) => (
              <SortableResearchRow
                key={r._id}
                item={r}
                onEdit={openEdit}
                onDelete={(id) => { if (window.confirm(`Delete "${r.title || 'Intro section'}"?`)) removeItem({ token, id }); }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
              <button className={btnDanger} onClick={() => { if (window.confirm(`Delete "${p.title}"?`)) removePos({ token, id: p._id }); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Pages ──────────────────────────────────────────────────────────────────────

const PAGE_KEYS = [
  { key: "home", label: "Home", hasImage: true },
  { key: "aboutUs", label: "About Us", hasImage: true },
  { key: "services", label: "Services", hasImage: false },
] as const;

type PageKey = typeof PAGE_KEYS[number]["key"];

function PageEditor({ pageKey, label, hasImage, token }: { pageKey: PageKey; label: string; hasImage: boolean; token: string }) {
  const content = useQuery(api.siteContent.getByKey, { key: pageKey });
  const upsert = useMutation(api.siteContent.upsert);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [imageStorageId, setImageStorageId] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content) {
      setParagraphs(content.paragraphs.length ? content.paragraphs : [""]);
      setImageStorageId(content.image ?? "");
      setImageAlt(content.imageAlt ?? "");
    }
  }, [content]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const uploadUrl = await generateUploadUrl({ token });
    const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = await res.json();
    setImageStorageId(storageId);
    setUploading(false);
  };

  const save = async () => {
    await upsert({
      token, key: pageKey,
      paragraphs: paragraphs.filter(p => p.trim()),
      image: imageStorageId || undefined,
      imageAlt: imageAlt || undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              className={`${input} flex-1 h-28`}
              value={p}
              onChange={e => { const next = [...paragraphs]; next[i] = e.target.value; setParagraphs(next); }}
              placeholder="Paragraph text. Use [link text](url) for links."
            />
            <button
              className="text-red-400 hover:text-red-600 text-lg flex-shrink-0"
              onClick={() => setParagraphs(paragraphs.filter((_, j) => j !== i))}
            >×</button>
          </div>
        ))}
        <button className={btnSecondary} onClick={() => setParagraphs([...paragraphs, ""])}>+ Add paragraph</button>
      </div>

      {hasImage && (
        <div className="grid grid-cols-2 gap-4">
          <Field label="Image">
            <ImagePicker currentStorageId={imageStorageId} onSelect={setImageStorageId} token={token} />
          </Field>
          <Field label="Image alt text">
            <input className={input} value={imageAlt} onChange={e => setImageAlt(e.target.value)} />
          </Field>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button className={btnPrimary} onClick={save}>Save</button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
      <p className="text-xs text-gray-400">Use [link text](url) syntax for hyperlinks in paragraphs.</p>
    </div>
  );
}

function PagesAdmin({ token }: { token: string }) {
  const [activePage, setActivePage] = useState<PageKey>("home");
  const current = PAGE_KEYS.find(p => p.key === activePage)!;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Page Content</h2>
      <div className="flex gap-2 border-b">
        {PAGE_KEYS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activePage === key ? "border-sky-950 text-sky-950" : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <PageEditor key={activePage} pageKey={activePage} label={current.label} hasImage={current.hasImage} token={token} />
    </div>
  );
}

// ── Image library ─────────────────────────────────────────────────────────────

function ImagePicker({ currentStorageId, onSelect, token }: {
  currentStorageId: string;
  onSelect: (storageId: string) => void;
  token: string;
}) {
  const images = useQuery(api.images.list) ?? [];
  const [open, setOpen] = useState(false);
  const current = images.find((img: any) => img.storageId === currentStorageId);

  return (
    <div className="space-y-2">
      {current ? (
        <div className="flex items-center gap-3">
          <img src={current.url ?? ""} className="w-16 h-16 object-cover rounded-lg border" alt={current.title} />
          <div>
            <p className="text-sm font-medium">{current.title}</p>
            {current.source && <p className="text-xs text-gray-400">{current.source}</p>}
            <button className="text-xs text-red-500 hover:underline mt-1" onClick={() => onSelect("")}>Remove</button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">No image selected</p>
      )}
      <button className={btnSecondary} onClick={() => setOpen(true)}>
        {current ? "Change image" : "Pick from library"}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Pick from image library</h3>
              <button className="text-gray-400 hover:text-gray-700 text-xl" onClick={() => setOpen(false)}>×</button>
            </div>
            {images.length === 0 ? (
              <p className="text-center text-gray-400 py-12">No images yet — add some in the Images tab.</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {images.map((img: any) => (
                  <button
                    key={img._id}
                    onClick={() => { onSelect(img.storageId); setOpen(false); }}
                    className={`border-2 rounded-xl overflow-hidden text-left transition-all hover:border-sky-700 ${img.storageId === currentStorageId ? "border-sky-950" : "border-gray-100"}`}
                  >
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium truncate">{img.title}</p>
                      {img.source && <p className="text-xs text-gray-400 truncate">{img.source}</p>}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ImagesAdmin({ token }: { token: string }) {
  const images = useQuery(api.images.list) ?? [];
  const addImage = useMutation(api.images.add);
  const removeImage = useMutation(api.images.remove);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const [form, setForm] = useState({ title: "", source: "" });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (!form.title.trim()) { alert("Please enter a title first."); return; }
    setUploading(true);
    const uploadUrl = await generateUploadUrl({ token });
    const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = await res.json();
    await addImage({ token, storageId, title: form.title, source: form.source || undefined });
    setForm({ title: "", source: "" });
    setUploading(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Image Library</h2>

      <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
        <h3 className="font-semibold text-sm">Add new image</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title / alt text *">
            <input className={input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. SIAF campus in Davos" />
          </Field>
          <Field label="Source / credit (optional)">
            <input className={input} value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} placeholder="e.g. © SIAF 2024" />
          </Field>
        </div>
        <Field label="Image file">
          <input type="file" accept="image/*" className="text-sm"
            onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
          {uploading && <p className="text-xs text-gray-500 mt-1">Uploading…</p>}
        </Field>
      </div>

      {images.length === 0 ? (
        <p className="text-gray-400 text-sm italic">No images yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {(images as any[]).map(img => (
            <div key={img._id} className="border rounded-xl overflow-hidden bg-white" style={{ boxShadow: "0 2px 8px -2px rgba(15,23,42,0.08)" }}>
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
              </div>
              <div className="p-3 space-y-1">
                <p className="font-medium text-sm">{img.title}</p>
                {img.source && <p className="text-xs text-gray-400">{img.source}</p>}
                <button
                  className={`${btnDanger} text-xs mt-2`}
                  onClick={() => { if (window.confirm(`Delete "${img.title}"?`)) removeImage({ token, id: img._id }); }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Settings ───────────────────────────────────────────────────────────────────

function SettingsAdmin({ token }: { token: string }) {
  const upsert = useMutation(api.siteSettings.upsert);

  // Social links
  const socialRaw = useQuery(api.siteSettings.getByKey, { key: "social" });
  const [social, setSocial] = useState({ twitter: "", github: "", bluesky: "", linkedin: "" });
  const [socialSaved, setSocialSaved] = useState(false);

  useEffect(() => {
    if (socialRaw) {
      try { setSocial(JSON.parse(socialRaw)); } catch {}
    }
  }, [socialRaw]);

  const saveSocial = async () => {
    await upsert({ token, key: "social", value: JSON.stringify(social) });
    setSocialSaved(true);
    setTimeout(() => setSocialSaved(false), 2000);
  };

  // Footer links
  const linksRaw = useQuery(api.siteSettings.getByKey, { key: "footerLinks" });
  const [links, setLinks] = useState<{ name: string; link: string }[]>([]);
  const [linksSaved, setLinksSaved] = useState(false);

  useEffect(() => {
    if (linksRaw) {
      try { setLinks(JSON.parse(linksRaw)); } catch {}
    } else if (linksRaw === null) {
      setLinks([
        { name: "University of Zurich", link: "https://uzh.ch/de.html" },
        { name: "SIAF", link: "https://www.siaf.uzh.ch/" },
      ]);
    }
  }, [linksRaw]);

  const saveLinks = async () => {
    await upsert({ token, key: "footerLinks", value: JSON.stringify(links) });
    setLinksSaved(true);
    setTimeout(() => setLinksSaved(false), 2000);
  };

  return (
    <div className="space-y-12">
      <h2 className="text-xl font-semibold">Settings</h2>

      {/* Social links */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold border-b pb-2">Social media links</h3>
        <Field label="Twitter / X URL">
          <input className={input} value={social.twitter} onChange={e => setSocial(s => ({ ...s, twitter: e.target.value }))} placeholder="https://twitter.com/..." />
        </Field>
        <Field label="GitHub URL">
          <input className={input} value={social.github} onChange={e => setSocial(s => ({ ...s, github: e.target.value }))} placeholder="https://github.com/..." />
        </Field>
        <Field label="Bluesky URL">
          <input className={input} value={social.bluesky} onChange={e => setSocial(s => ({ ...s, bluesky: e.target.value }))} placeholder="https://bsky.app/profile/..." />
        </Field>
        <Field label="LinkedIn URL">
          <input className={input} value={social.linkedin} onChange={e => setSocial(s => ({ ...s, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." />
        </Field>
        <div className="flex items-center gap-3">
          <button className={btnPrimary} onClick={saveSocial}>Save</button>
          {socialSaved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
        <p className="text-xs text-gray-400">Leave a field empty to hide that icon in the footer.</p>
      </div>

      {/* Footer external links */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold border-b pb-2">Footer links</h3>
        {links.map((link, i) => (
          <div key={i} className="flex gap-3 items-center">
            <input className={`${input} flex-1`} placeholder="Label" value={link.name}
              onChange={e => { const next = [...links]; next[i] = { ...next[i], name: e.target.value }; setLinks(next); }} />
            <input className={`${input} flex-1`} placeholder="URL" value={link.link}
              onChange={e => { const next = [...links]; next[i] = { ...next[i], link: e.target.value }; setLinks(next); }} />
            <button className={btnDanger} onClick={() => setLinks(links.filter((_, j) => j !== i))}>×</button>
          </div>
        ))}
        <button className={btnSecondary} onClick={() => setLinks([...links, { name: "", link: "" }])}>+ Add link</button>
        <div className="flex items-center gap-3">
          <button className={btnPrimary} onClick={saveLinks}>Save</button>
          {linksSaved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </div>
    </div>
  );
}

// ── Main admin page ────────────────────────────────────────────────────────────

const TABS = ["Team", "Publications", "Research", "Open Positions", "Pages", "Images", "Settings"] as const;
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
        {tab === "Pages" && <PagesAdmin token={token} />}
        {tab === "Images" && <ImagesAdmin token={token} />}
        {tab === "Settings" && <SettingsAdmin token={token} />}
      </div>
    </div>
  );
}
