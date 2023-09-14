import { InferModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
});

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  email: text("email").notNull(),
});

export type Todo = InferModel<typeof todos>;
export type User = InferModel<typeof users>;

