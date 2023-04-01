import { drizzle } from "drizzle-orm/d1";
import type { IRequest } from "itty-router";
import type { Env } from "../interfaces/Env";

export const withDB = (request: IRequest, env: Env) => {
	const db = drizzle(env.DB);
	request.db = db;
};
