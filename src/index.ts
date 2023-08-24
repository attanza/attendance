import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import 'dotenv/config';
import { workDay } from './libs/workDay';
import { getCredentials } from './libs/getCredentials';
import { checkOutOffice } from './libs/checkOutOffice';
import express, { Request, Response, NextFunction } from 'express';
import { checkInOfficeHcis } from './libs/checkInOfficeHcis';
import { checkInOfficeHcms } from './libs/checkInOfficeHcms';
import { checkHcmsStatus } from './libs/checkHcmsStatus';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
const port = 10000;
app.disable('x-powered-by');
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
          // promises.push(checkInOfficeHcis(niks[i], passwords[i]));
          promises.push(checkInOfficeHcms(niks[i], passwords[i]));
        }
        // @ts-ignore
        await Promise.all[promises];
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

      const promises = [];
      if (niks && niks.length > 0) {
        for (let i = 0; i < niks.length; i++) {
          promises.push(checkOutOffice(niks[i], passwords[i]));
        }
        // @ts-ignore
        await Promise.all[promises];
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
app.post('/check-status', async (_: Request, res: Response) => {
  try {
    const { niks, passwords } = getCredentials();

    const promises = [];
    if (niks && niks.length > 0) {
      for (let i = 0; i < niks.length; i++) {
        promises.push(checkHcmsStatus(niks[i], passwords[i]));
      }
      // @ts-ignore
      await Promise.all[promises];
    } else {
      res.send('no users');
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
