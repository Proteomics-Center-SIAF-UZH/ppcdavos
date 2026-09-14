import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";
import { Id } from "./_generated/dataModel";

export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const content = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
    if (!content) return null;
    let imageUrl: string | null = null;
    let imageSource: string | undefined;
    if (content.image) {
      if (content.image.startsWith("http") || content.image.startsWith("/")) {
        imageUrl = content.image;
      } else {
        imageUrl = await ctx.storage.getUrl(content.image as Id<"_storage">);
        const imgRecord = await ctx.db.query("images")
          .filter((q) => q.eq(q.field("storageId"), content.image))
          .first();
        imageSource = imgRecord?.source;
      }
    }
    return { ...content, imageUrl, imageSource };
  },
});

export const upsert = mutation({
  args: {
    token: v.string(),
    key: v.string(),
    paragraphs: v.array(v.string()),
    image: v.optional(v.string()),
    imageAlt: v.optional(v.string()),
  },
  handler: async (ctx, { token, key, ...data }) => {
    await requireAuth(ctx, token);
    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, data);
    } else {
      await ctx.db.insert("siteContent", { key, ...data });
    }
  },
});
