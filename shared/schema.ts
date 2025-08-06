import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const games = pgTable("games", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  currency: text("currency").notNull(),
  imageUrl: text("image_url").notNull(),
  isPopular: integer("is_popular").default(0),
});

export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gameId: text("game_id").notNull(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  price: integer("price").notNull(),
  isPopular: integer("is_popular").default(0),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: text("order_id").notNull().unique(),
  gameId: text("game_id").notNull(),
  packageId: text("package_id").notNull(),
  userId: text("user_id").notNull(),
  serverId: text("server_id"),
  whatsappNumber: text("whatsapp_number"),
  paymentMethod: text("payment_method").notNull(),
  totalAmount: integer("total_amount").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  isActive: integer("is_active").default(1),
});

export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  isActive: integer("is_active").default(1),
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  orderId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  userId: z.string().min(1, "User ID is required"),
  gameId: z.string().min(1, "Game selection is required"),
  packageId: z.string().min(1, "Package selection is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
});

export type Game = typeof games.$inferSelect;
export type Package = typeof packages.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Faq = typeof faqs.$inferSelect;

export type InsertGame = z.infer<typeof insertGameSchema>;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertFaq = z.infer<typeof insertFaqSchema>;
