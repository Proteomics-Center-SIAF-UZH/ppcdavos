import { action } from "./_generated/server";
import { internal } from "./_generated/api";

const SHEETS_BASE =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWunO92NxSnFVWEb7e4dV4a8saxxdr8VKfR4rKmKb0s4JCxA6UOEdM0N1zx1tX6VodaGG9COZQ5ngq";

const URLS = {
  team:          `${SHEETS_BASE}/pub?gid=0&single=true&output=csv`,
  publications:  `${SHEETS_BASE}/pub?gid=692909773&single=true&output=csv`,
  research:      `${SHEETS_BASE}/pub?gid=2033372340&single=true&output=csv`,
  openPositions: `${SHEETS_BASE}/pub?gid=657860477&single=true&output=csv`,
};

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; continue; }
      if (char === "," && !inQuotes) { values.push(current.trim()); current = ""; continue; }
      current += char;
    }
    values.push(current.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = values[i] ?? ""));
    return row;
  });
}

export const populate = action({
  handler: async (ctx) => {
    // ── Team ────────────────────────────────────────────────────────────────
    const teamCSV = await fetch(URLS.team).then((r) => r.text());
    const teamRows = parseCSV(teamCSV);
    for (let i = 0; i < teamRows.length; i++) {
      const r = teamRows[i];
      await ctx.runMutation(internal.seed.insertTeam, {
        name: r.name,
        otherNames: r.otherNames ? r.otherNames.split(";").map((s) => s.trim()).filter(Boolean) : undefined,
        prefix: r.prefix || undefined,
        title: r.title,
        image: r.image || undefined,
        email: r.email,
        telephone: r.telephone && !r.telephone.startsWith("#") ? r.telephone : undefined,
        isAlumni: r.isAlumni === "TRUE",
        isVisiting: r.isVisiting === "TRUE",
        sortOrder: i,
      });
    }

    // ── Publications ─────────────────────────────────────────────────────────
    const pubCSV = await fetch(URLS.publications).then((r) => r.text());
    const pubRows = parseCSV(pubCSV);
    for (const r of pubRows) {
      await ctx.runMutation(internal.seed.insertPublication, {
        title: r.title,
        journal: r.journal,
        link: r.link,
        year: parseInt(r.year),
        authors: r.authors.split(";").map((s) => s.trim()).filter(Boolean),
        abstract: r.abstract || undefined,
      });
    }

    // ── Research ─────────────────────────────────────────────────────────────
    const resCSV = await fetch(URLS.research).then((r) => r.text());
    const resRows = parseCSV(resCSV);
    for (let i = 0; i < resRows.length; i++) {
      const r = resRows[i];
      await ctx.runMutation(internal.seed.insertResearch, {
        title: r.title || undefined,
        textBlocks: r.textBlocks.split("|||").map((s) => s.trim()).filter(Boolean),
        image: r.imageSrc || undefined,
        imageAlt: r.imageAlt || undefined,
        sortOrder: i,
      });
    }

    // ── Open Positions ────────────────────────────────────────────────────────
    const posCSV = await fetch(URLS.openPositions).then((r) => r.text());
    const posRows = parseCSV(posCSV);
    for (const r of posRows) {
      await ctx.runMutation(internal.seed.insertOpenPosition, {
        title: r.title,
        description: r.description,
        requirements: r.requirements.split(";").map((s) => s.trim()).filter(Boolean),
        responsibilities: r.responsibilities.split(";").map((s) => s.trim()).filter(Boolean),
        location: r.location,
        type: r.type,
        duration: r.duration || undefined,
        isActive: r.isActive === "TRUE",
      });
    }

    return "Seeded successfully";
  },
});

// ── Internal insert mutations ──────────────────────────────────────────────────

import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const insertTeam = internalMutation({
  args: {
    name: v.string(), otherNames: v.optional(v.array(v.string())),
    prefix: v.optional(v.string()), title: v.string(),
    image: v.optional(v.string()), email: v.string(),
    telephone: v.optional(v.string()), isAlumni: v.optional(v.boolean()),
    isVisiting: v.optional(v.boolean()), sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => { await ctx.db.insert("team", args); },
});

export const insertPublication = internalMutation({
  args: {
    title: v.string(), journal: v.string(), link: v.string(),
    year: v.number(), authors: v.array(v.string()), abstract: v.optional(v.string()),
  },
  handler: async (ctx, args) => { await ctx.db.insert("publications", args); },
});

export const insertResearch = internalMutation({
  args: {
    title: v.optional(v.string()), textBlocks: v.array(v.string()),
    image: v.optional(v.string()), imageAlt: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => { await ctx.db.insert("research", args); },
});

export const insertOpenPosition = internalMutation({
  args: {
    title: v.string(), description: v.string(),
    requirements: v.array(v.string()), responsibilities: v.array(v.string()),
    location: v.string(), type: v.string(),
    duration: v.optional(v.string()), isActive: v.boolean(),
  },
  handler: async (ctx, args) => { await ctx.db.insert("openPositions", args); },
});
