import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';

const { PORT } = process.env;
const service = express();
const router = express.Router();

service.use(express.json());
service.use(morgan('dev'));
service.use('/', router);

router.get('/reviews', (req, res) => {
  res.status(200).send(`Reviews`);
});

router.get('/meta', (req, res) => {
  res.status(200).send(`Meta`);
});

router.post('/reviews', (req, res) => {
  console.log(req.body);
  res.status(201).send(req.body);
});

router.put('/reviews/:review_id/helpful', (req, res) => {
  res.sendStatus(204);
});

router.put('/reviews/:review_id/report', (req, res) => {
  res.sendStatus(204);
});

service.listen(PORT);
console.log(`Server active. Listening on port ${PORT}`);
