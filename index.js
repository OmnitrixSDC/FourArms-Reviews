const express = require('express');
const morgan = require('morgan');
const { getReviews, postReview, updateHelpful } = require('./controllers');
require('dotenv').config();

const { SERVER_PORT } = process.env;
const service = express();
const router = express.Router();

service.use(express.json());
service.use(morgan('dev'));
service.use('/', router);

router.get('/reviews', (req, res) => {
  const { productId } = req.body;
  getReviews(productId).then((data) => {
    res.status(200).send(data);
  });
});

router.get('/reviews/meta', (req, res) => {
  res.status(200).send(`Meta`);
});

router.post('/reviews', (req, res) => {
  postReview(req.body);
  res.status(201).send(req.body);
});

router.put('/reviews/:review_id/helpful', (req, res) => {
  console.log(req.path.slice(9));
  res.sendStatus(204);
});

router.put('/reviews/:review_id/report', (req, res) => {
  res.sendStatus(204);
});

service.listen(SERVER_PORT);
console.log(`Server active. Listening on port ${SERVER_PORT}`);
