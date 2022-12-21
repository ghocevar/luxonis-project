import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import flatsRouter from './routes/flatsRouter';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/v1/flats', flatsRouter);

app.all('*', (req: Request, res: Response) => {
  res.status(404).send(`Cannot found ${req.path}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
