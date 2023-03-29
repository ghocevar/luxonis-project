import { Router } from "itty-router";

const router = Router();

router.get("/", () => new Response("Hello World"));

router.all("*", () => new Response("Not Found", { status: 404 }));

export default {
	fetch: router.handle,
};
