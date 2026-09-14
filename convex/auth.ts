import { action, internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { MutationCtx } from "./_generated/server";

export async function requireAuth(ctx: MutationCtx, token: string) {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .first();
  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Unauthorized");
  }
}

export const login = action({
  args: { password: v.string() },
  handler: async (ctx, { password }) => {
    if (password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Invalid password");
    }
    const token = crypto.randomUUID();
    await ctx.runMutation(internal.auth.createSession, {
      token,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    return token;
  },
});

export const createSession = internalMutation({
  args: { token: v.string(), expiresAt: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("sessions", args);
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();
    if (session) await ctx.db.delete(session._id);
  },
});
