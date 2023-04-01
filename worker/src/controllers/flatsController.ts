import type { Request } from "../interfaces/Request";
import type { Env } from "../interfaces/Env";
import { flats } from "../d1/schema";
import { getFlats } from "../services/srealityApi";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export const getAllFlats = async (req: Request, env: Env) => {
	try {
		const data = await req.db?.select().from(flats).all();
		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify(error), {
			headers: { "Content-Type": "application/json" },
		});
	}
};

export const scrapeFlats = async (req: Request, env: Env) => {
	try {
		await populateFlats(req.db!);
		return new Response(JSON.stringify({ success: true }), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify(error), {
			headers: { "Content-Type": "application/json" },
		});
	}
};

const populateFlats = async (db: DrizzleD1Database) => {
	try {
		const flatsToInsert = await getFlats();
		await db.delete(flats).all();
		await db.insert(flats).values(flatsToInsert).run();
	} catch (error) {
		console.log(error);
	}
};
