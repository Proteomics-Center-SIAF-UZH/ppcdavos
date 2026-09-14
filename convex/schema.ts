import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  team: defineTable({
    name: v.string(),
    otherNames: v.optional(v.array(v.string())),
    prefix: v.optional(v.string()),
    title: v.string(),
    image: v.optional(v.string()), // Convex storageId or legacy filename
    email: v.string(),
    telephone: v.optional(v.string()),
    isVisiting: v.optional(v.boolean()),
    isAlumni: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
    bio: v.optional(v.string()),
  }),

  publications: defineTable({
    title: v.string(),
    journal: v.string(),
    link: v.string(),
    year: v.number(),
    authors: v.array(v.string()),
    abstract: v.optional(v.string()),
  }),

  research: defineTable({
    title: v.optional(v.string()),
    textBlocks: v.array(v.string()),
    image: v.optional(v.string()), // Convex storageId or URL
    imageAlt: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  }),

  openPositions: defineTable({
    title: v.string(),
    description: v.string(),
    requirements: v.array(v.string()),
    responsibilities: v.array(v.string()),
    location: v.string(),
    type: v.string(),
    duration: v.optional(v.string()),
    isActive: v.boolean(),
  }),

  images: defineTable({
    storageId: v.string(),
    title: v.string(),
    source: v.optional(v.string()),
  }),

  siteSettings: defineTable({
    key: v.string(),
    value: v.string(), // JSON string
  }).index("by_key", ["key"]),

  siteContent: defineTable({
    key: v.string(),
    paragraphs: v.array(v.string()),
    image: v.optional(v.string()),
    imageAlt: v.optional(v.string()),
  }).index("by_key", ["key"]),

  sessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),
});
