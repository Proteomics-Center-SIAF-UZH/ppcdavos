import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("publications").collect();
  },
});

export const getByAuthor = query({
  args: { names: v.array(v.string()) },
  handler: async (ctx, { names }) => {
    const all = await ctx.db.query("publications").collect();
    return all
      .filter((p) => p.authors.some((a) => names.includes(a)))
      .sort((a, b) => b.year - a.year);
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    title: v.string(),
    journal: v.string(),
    link: v.string(),
    year: v.number(),
    authors: v.array(v.string()),
    abstract: v.optional(v.string()),
  },
  handler: async (ctx, { token, ...data }) => {
    await requireAuth(ctx, token);
    return await ctx.db.insert("publications", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("publications"),
    title: v.optional(v.string()),
    journal: v.optional(v.string()),
    link: v.optional(v.string()),
    year: v.optional(v.number()),
    authors: v.optional(v.array(v.string())),
    abstract: v.optional(v.string()),
  },
  handler: async (ctx, { token, id, ...data }) => {
    await requireAuth(ctx, token);
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("publications") },
  handler: async (ctx, { token, id }) => {
    await requireAuth(ctx, token);
    await ctx.db.delete(id);
  },
});
