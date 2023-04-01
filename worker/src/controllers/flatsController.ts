import type { Request } from "../interfaces/Request";
import type { Env } from "../interfaces/Env";
import { flat } from "../d1/schema";
import { getFlats } from "../services/srealityApi";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export const getAllFlats = async (req: Request, env: Env) => {
	if (!req.db) {
		return new Response("Internal server error", {
			status: 500,
		});
	}

	const { take, skip } = req.query;
	const parsedTake = take ? parseInt(take as string) : 20;
	const parsedSkip = skip ? parseInt(skip as string) : 0;

	try {
		const data = await req.db
			.select()
			.from(flat)
			.limit(parsedTake)
			.offset(parsedSkip)
			.all();
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
	if (!req.db) {
		return new Response("Internal server error", {
			status: 500,
		});
	}

	try {
		await populateFlats(req.db);
		return new Response(JSON.stringify({ success: true }), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response("Internal server error", {
			status: 500,
		});
	}
};

const populateFlats = async (db: DrizzleD1Database) => {
	try {
		const flatsToInsert = await getFlats();
		await db.delete(flat).all();
		await db.insert(flat).values(flatsToInsert).run();
	} catch (error) {
		throw new Error(error);
	}
};
