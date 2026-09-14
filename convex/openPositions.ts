import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("openPositions").collect();
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    title: v.string(),
    description: v.string(),
    requirements: v.array(v.string()),
    responsibilities: v.array(v.string()),
    location: v.string(),
    type: v.string(),
    duration: v.optional(v.string()),
    isActive: v.boolean(),
  },
  handler: async (ctx, { token, ...data }) => {
    await requireAuth(ctx, token);
    return await ctx.db.insert("openPositions", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("openPositions"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    requirements: v.optional(v.array(v.string())),
    responsibilities: v.optional(v.array(v.string())),
    location: v.optional(v.string()),
    type: v.optional(v.string()),
    duration: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, { token, id, ...data }) => {
    await requireAuth(ctx, token);
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("openPositions") },
  handler: async (ctx, { token, id }) => {
    await requireAuth(ctx, token);
    await ctx.db.delete(id);
  },
});
