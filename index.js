import express from 'express';
import 'dotenv/config';
import { checkInOffice } from './libs/checkInOffice.js';
import { workDay } from './libs/workDay.js';

const app = express();
const port = 10000;

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/attendance', async (req, res) => {
  try {
    if (workDay()) {
      const resp = await checkInOffice();
      res.json(resp);
    } else {
      res.send('not working day');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.listen(port, () =>
  console.log(`Example app listening on http://localhost:${port}`)
);
