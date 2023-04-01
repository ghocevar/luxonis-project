import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const flats = sqliteTable("flat", {
	id: integer("id").primaryKey(),
	title: text("title").notNull(),
	imageUrl: text("image_url").notNull(),
});
