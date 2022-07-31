const db = require('../db');
const query = {
  name: '',
  text: '',
  values: [],
};

module.exports.getReviews = (productId) => {
  query.text = `SELECT id, rating, summary, recommend, response, body, date, name, helpfulness, (SELECT json_agg(json_build_object('id', photos.id, 'url', photos.url)) FROM photos WHERE photos.review_id = reviews.id) AS target_photos FROM reviews WHERE product_id = $1;`;
  query.name = 'get reviews';
  query.values = [productId];
  return db.query(query);
};

module.exports.getMeta = (productId) => {
  query.text = '';
  query.name = 'get meta data';
  query.values = [productId];
};

module.exports.postReview = (review) => {
  console.log(review);
  const date = Date.now();
  query.text = '';
  query.name = 'get meta data';
  query.values = [];
};

module.exports.updateHelpful = (reviewId) => {
  query.text = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1';
  query.name = 'update helpful';
  query.values = [reviewId];

  return db.query(query);
};

module.exports.reportReview = (reviewId) => {
  query.text = 'UPDATE reviews SET reported = NOT reported WHERE id = $1';
  query.name = 'toggle reported';
  query.values = [reviewId];

  return db.query(query);
};
