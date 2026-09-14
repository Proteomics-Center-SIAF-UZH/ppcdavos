import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";
import { Id } from "./_generated/dataModel";

export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const row = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
    return row?.value ?? null;
  },
});

export const getLogoUrl = query({
  handler: async (ctx) => {
    const setting = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "logo"))
      .first();
    if (!setting?.value) return null;
    return await ctx.storage.getUrl(setting.value as Id<"_storage">);
  },
});

export const upsert = mutation({
  args: { token: v.string(), key: v.string(), value: v.string() },
  handler: async (ctx, { token, key, value }) => {
    await requireAuth(ctx, token);
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { value });
    } else {
      await ctx.db.insert("siteSettings", { key, value });
    }
  },
});
