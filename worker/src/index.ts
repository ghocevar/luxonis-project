import { Router } from "itty-router";
import { getAllFlats, scrapeFlats } from "./controllers/flatsController";
import { withDB } from "./middlewares/withDB";

export { Env } from "./interfaces/Env";

const router = Router();

router.get("/", () => new Response("Hello World"));

router.get("/api/v1/flats", withDB, getAllFlats);
router.get("/api/v1/flats/scrape", withDB, scrapeFlats);

router.all("*", () => new Response("Not Found", { status: 404 }));

export default {
	fetch: router.handle,
};
