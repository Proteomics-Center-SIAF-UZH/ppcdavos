import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";
import { Id } from "./_generated/dataModel";

export const list = query({
  handler: async (ctx) => {
    const images = await ctx.db.query("images").collect();
    return await Promise.all(
      images.map(async (img) => ({
        ...img,
        url: await ctx.storage.getUrl(img.storageId as Id<"_storage">),
      }))
    );
  },
});

export const add = mutation({
  args: {
    token: v.string(),
    storageId: v.string(),
    title: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, { token, ...data }) => {
    await requireAuth(ctx, token);
    return await ctx.db.insert("images", data);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("images") },
  handler: async (ctx, { token, id }) => {
    await requireAuth(ctx, token);
    const img = await ctx.db.get(id);
    if (img) {
      await ctx.storage.delete(img.storageId as Id<"_storage">).catch(() => {});
    }
    await ctx.db.delete(id);
  },
});
