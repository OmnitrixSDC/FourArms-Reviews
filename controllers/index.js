const db = require('../db');

function getReviews(productId) {
  const text = `SELECT id from reviews where product_id = $1`;

  let query = {
    name: 'get reviews',
    text: text,
    values: [productId],
  };
  return db.query(query);
}

module.exports = getReviews;
