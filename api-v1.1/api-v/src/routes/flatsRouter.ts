import { Router } from 'express';
import { getAllFlats, scrapeFlats } from '@controllers/flatsController';

const router = Router();

router.get('/', getAllFlats);

router.get('/scrape', scrapeFlats);

export default router;
