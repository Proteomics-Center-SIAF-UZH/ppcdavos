import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";
import { Id } from "./_generated/dataModel";

async function resolveImage(ctx: any, image?: string) {
  if (!image) return undefined;
  if (image.startsWith("http") || image.startsWith("/")) return image;
  if (image.includes(".")) return undefined; // legacy filename — upload via admin to get a Convex URL
  return await ctx.storage.getUrl(image as Id<"_storage">);
}

export const list = query({
  handler: async (ctx) => {
    const members = await ctx.db
      .query("team")
      .collect();
    const sorted = members.sort((a: any, b: any) =>
      a.name.split(" ")[0].localeCompare(b.name.split(" ")[0])
    );
    return await Promise.all(
      sorted.map(async (m: any) => ({
        ...m,
        imageUrl: await resolveImage(ctx, m.image),
      }))
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const members = await ctx.db.query("team").collect();
    const member = members.find(
      (m) => m.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === slug
    );
    if (!member) return null;
    return { ...member, imageUrl: await resolveImage(ctx, member.image) };
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
    bio: v.optional(v.string()),
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
    bio: v.optional(v.string()),
  },
  handler: async (ctx, { token, id, bio, prefix, telephone, otherNames, ...data }) => {
    await requireAuth(ctx, token);
    await ctx.db.patch(id, {
      ...data,
      prefix: prefix || undefined,
      telephone: telephone || undefined,
      bio: bio || undefined,
      otherNames: otherNames && otherNames.length > 0 ? otherNames : undefined,
    });
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("team") },
  handler: async (ctx, { token, id }) => {
    await requireAuth(ctx, token);
    await ctx.db.delete(id);
  },
});
