import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";
import { Id } from "./_generated/dataModel";

async function resolveImage(ctx: any, image?: string) {
  if (!image) return undefined;
  if (image.startsWith("http") || image.startsWith("/")) return image;
  return await ctx.storage.getUrl(image as Id<"_storage">);
}

export const list = query({
  handler: async (ctx) => {
    const items = await ctx.db.query("research").collect();
    const sorted = items.sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    return await Promise.all(
      sorted.map(async (r: any) => ({
        ...r,
        imageSrc: await resolveImage(ctx, r.image),
      }))
    );
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    title: v.optional(v.string()),
    textBlocks: v.array(v.string()),
    image: v.optional(v.string()),
    imageAlt: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, { token, ...data }) => {
    await requireAuth(ctx, token);
    return await ctx.db.insert("research", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("research"),
    title: v.optional(v.string()),
    textBlocks: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    imageAlt: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, { token, id, ...data }) => {
    await requireAuth(ctx, token);
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("research") },
  handler: async (ctx, { token, id }) => {
    await requireAuth(ctx, token);
    await ctx.db.delete(id);
  },
});
