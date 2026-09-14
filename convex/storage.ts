import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./auth";
import { Id } from "./_generated/dataModel";

export const generateUploadUrl = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    await requireAuth(ctx, token);
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    if (storageId.startsWith("http") || storageId.startsWith("/")) {
      return storageId;
    }
    return await ctx.storage.getUrl(storageId as Id<"_storage">);
  },
});
