import type { IRequest } from "itty-router";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export interface Request extends IRequest {
	db?: DrizzleD1Database;
}
