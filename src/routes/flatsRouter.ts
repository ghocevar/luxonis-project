import * as express from 'express';
import { getAllFlats, scrapeFlats } from '../controllers/flatsController';

const router = express.Router();

router.get('/', getAllFlats);

router.get('/scrape', scrapeFlats);

export default router;
