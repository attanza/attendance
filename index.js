import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import 'dotenv/config';
import { checkInOffice } from './libs/checkInOffice.js';
import { workDay } from './libs/workDay.js';
import { checkOutOffice } from './libs/checkOutOffice.js';
import { getCredentials } from './libs/getCredentials.js';

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

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/check-in', async (req, res) => {
  try {
    if (workDay()) {
      const { niks, passwords } = getCredentials();
      const promises = [];
      if (niks && niks.length > 0) {
        for (let i = 0; i < niks.length; i++) {
          promises.push(checkInOffice(niks[i], passwords[i]));
        }
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

app.post('/check-out', async (req, res) => {
  try {
    if (workDay()) {
      const { niks, passwords } = getCredentials();

      const promises = [];
      if (niks && niks.length > 0) {
        for (let i = 0; i < niks.length; i++) {
          promises.push(checkOutOffice(niks[i], passwords[i]));
        }
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

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(port, () =>
  console.log(`Example app listening on http://localhost:${port}`)
);
