import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import 'dotenv/config';
import { workDay } from './libs/workDay';
import { getCredentials } from './libs/getCredentials';
import express, { Request, Response, NextFunction } from 'express';
import { checkInOfficeHcms } from './libs/checkInOfficeHcms';
import { checkOutOfficeHcms } from './libs/checkOutOfficeHcms';
import { randTime } from './libs/randTime';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
const port = 10000;
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(helmet());
app.use(limiter);

app.get('/', (_: Request, res: Response) => res.send('Hello World!'));
app.post('/check-in', async (_: Request, res: Response) => {
  try {
    if (workDay()) {
      const { niks, passwords } = getCredentials();
      const promises: any = [];
      if (niks && niks.length > 0) {
        for (let i = 0; i < niks.length; i++) {
          promises.push(checkInOfficeHcms(niks[i], passwords[i]));
        }
        setTimeout(async function () {
          // @ts-ignore
          await Promise.all[promises];
        }, 1000 * 60 * randTime(2, 6));
      } else {
        res.send('no users');
      }

      res.send('Thank you!');
    } else {
      res.send('not working day');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post('/check-out', async (_: Request, res: Response) => {
  try {
    if (workDay()) {
      const { niks, passwords } = getCredentials();

      const promises: any = [];
      if (niks && niks.length > 0) {
        for (let i = 0; i < niks.length; i++) {
          promises.push(checkOutOfficeHcms(niks[i], passwords[i]));
        }
        setTimeout(async function () {
          // @ts-ignore
          await Promise.all[promises];
        }, 1000 * 60 * randTime(2, 6));
      } else {
        res.send('no users');
      }
      res.send('Thank you!');
    } else {
      res.send('not working day');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// custom 404
app.use((_: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Sorry can't find that!");
});

// custom error handler
app.use((err: any, _: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
