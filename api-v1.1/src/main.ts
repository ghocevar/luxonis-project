import 'dotenv/config';
import express, { Response, Request } from 'express';
import compression from 'compression';
import { limiter } from '@middlewares/limiter';
import helmet from 'helmet';
import flatsRouter from '@routes/flatsRouter';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(helmet(), compression(), limiter, express.json());

app.get('/', (_request: Request, response: Response) => {
  return response.json({ message: 'flats-api' });
});

app.use('/api/v1/flats', flatsRouter);

app.all('*', (_request: Request, response: Response) => {
  return response.status(404).json({ message: 'Not found' });
});

const port = process.env.PORT || 3000;

// listen to port
app.listen(port, async () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`);
});
