const express = require('express');
const morgan = require('morgan');
const {
  getReviews,
  postReview,
  updateHelpful,
  reportReview,
  getMeta,
} = require('./controllers');
require('dotenv').config();

const { SERVER_PORT } = process.env;
const service = express();
const router = express.Router();

service.use(express.json());
service.use(morgan('dev'));
service.use('/', router);
service.listen(SERVER_PORT);

router.get('/reviews', getReviews);
router.get('/reviews/meta', getMeta);
router.post('/reviews', postReview);
router.put('/reviews/:review_id/helpful', updateHelpful);
router.put('/reviews/:review_id/report', reportReview);

console.log(`Server active. Listening on port ${SERVER_PORT}`);
