import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";
import { Id } from "./_generated/dataModel";

async function resolveImage(ctx: any, image?: string) {
  if (!image) return undefined;
  if (image.startsWith("http") || image.startsWith("/")) return image;
  if (image.includes(".")) return `/images/members/${image}`;
  return await ctx.storage.getUrl(image as Id<"_storage">);
}

export const list = query({
  handler: async (ctx) => {
    const members = await ctx.db
      .query("team")
      .collect();
    const sorted = members.sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    return await Promise.all(
      sorted.map(async (m: any) => ({
        ...m,
        imageUrl: await resolveImage(ctx, m.image),
      }))
    );
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    name: v.string(),
    otherNames: v.optional(v.array(v.string())),
    prefix: v.optional(v.string()),
    title: v.string(),
    image: v.optional(v.string()),
    email: v.string(),
    telephone: v.optional(v.string()),
    isVisiting: v.optional(v.boolean()),
    isAlumni: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, { token, ...data }) => {
    await requireAuth(ctx, token);
    return await ctx.db.insert("team", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("team"),
    name: v.optional(v.string()),
    otherNames: v.optional(v.array(v.string())),
    prefix: v.optional(v.string()),
    title: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    telephone: v.optional(v.string()),
    isVisiting: v.optional(v.boolean()),
    isAlumni: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, { token, id, ...data }) => {
    await requireAuth(ctx, token);
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("team") },
  handler: async (ctx, { token, id }) => {
    await requireAuth(ctx, token);
    await ctx.db.delete(id);
  },
});
