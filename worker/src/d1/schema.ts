import { InferModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const flat = sqliteTable("flat", {
	id: integer("id").primaryKey(),
	title: text("title").notNull(),
	imageUrl: text("image_url").notNull(),
});

export type Flat = InferModel<typeof flat>;
export type UnsavedFlat = Omit<Flat, "id">;
