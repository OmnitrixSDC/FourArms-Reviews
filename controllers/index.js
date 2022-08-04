const _ = require('underscore');
const db = require('../db');

const query = {
  name: '',
  text: '',
  values: [],
};

const characteristicReviewQuery = {
  name: 'Insert Characteristic Reviews',
  text: 'INSERT INTO characteristic_reviews (id, review_id, characteristic_id, value) VALUES (default, $1, $2, $3);',
  values: [],
};

const insertPhotoQuery = {
  name: 'Insert Review Photos',
  text: 'INSERT INTO photos (id, review_id, url) VALUES (default, $1, $2)',
  values: [],
};

module.exports.getReviews = (req, res) => {
  const page = req.query.page || 0;
  const count = req.query.count || 5;
  const sort = req.query.sort || 'newest';
  //console.log(page, count, sort);
  query.text = `SELECT id review_id, rating, summary, recommend, response, body, to_timestamp(date/1000) date, name, helpfulness, (SELECT json_agg(json_build_object('id', photos.id, 'url', photos.url)) FROM photos WHERE photos.review_id = reviews.id) AS photos FROM reviews WHERE product_id = $1;`;
  query.name = 'get reviews';
  query.values = [req.query.product_id];
  db.query(query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.getMeta = (req, res) => {
  query.text = `WITH targRatings AS (SELECT rating FROM reviews WHERE product_id = $1 ORDER BY rating),
  rateReturn AS (SELECT json_build_object(
        1, (SELECT count(rating) from targRatings where rating = 1),
        2, (SELECT count(rating) from targRatings where rating = 2),
        3, (SELECT count(rating) from targRatings where rating = 3),
        4, (SELECT count(rating) from targRatings where rating = 4),
        5, (SELECT count(rating) from targRatings where rating = 5)
      )),
  recReturn AS (SELECT json_build_object('0', (SELECT count(recommend) FROM reviews where product_id = $1 AND recommend = false), '1', (SELECT count(recommend) FROM reviews WHERE product_id = $1 AND recommend = true)) AS recommended), tChars AS  (SELECT id, name FROM characteristics WHERE product_id = $1), charReturn AS (SELECT json_agg(json_build_object(tchars.name, json_build_object('id', tchars.id, 'value', (SELECT avg(value) FROM characteristic_reviews WHERE characteristic_reviews.characteristic_id = tchars.id)))) FROM tchars)
  SELECT json_build_object('ratings', (SELECT * FROM rateReturn), 'recommended', (SELECT * FROM recReturn), 'characteristics', (SELECT * FROM charReturn));`;
  query.name = 'get meta data';
  query.values = [req.query.product_id];
  db.query(query)
    .then((result) => {
      res.status(200).send(result[0]);
    });
};

module.exports.postReview = (req, res) => {
  const insertDate = Date.now();
  query.text = 'INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, name, email, response, helpfulness) VALUES (default, $1, $2, $3, $4, $5, $6, false, $7, $8, NULL, 0) RETURNING id;';
  query.name = 'Insert Review';
  query.values = [req.body.product_id,
    req.body.rating,
    insertDate,
    req.body.summary,
    req.body.body,
    req.body.recommend,
    req.body.name,
    req.body.email];

  db.query(query)
    .then((result) => {
      _.each(req.body.characteristics, (value, key) => {
        characteristicReviewQuery.values = [result[0].id, key, value];

        db.query(characteristicReviewQuery);
      });
      if (req.body.photos.length > 0) {
        _.each(req.body.photos, (photo) => {
          insertPhotoQuery.values = [result[0].id, photo];
          db.query(insertPhotoQuery);
        });
      }
      res.sendStatus(201);
      //res.status(201).send(`${result[0].id}`);
    });
};

module.exports.updateHelpful = (req, res) => {
  query.text = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1';
  query.name = 'update helpful';
  query.values = [req.path.slice(9, -8)];
  console.log(`REVIEW ID: ${req.path.slice(9, -8)}`);
  db.query(query)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.reportReview = (req, res) => {
  query.text = 'UPDATE reviews SET reported = NOT reported WHERE id = $1';
  query.name = 'toggle reported';
  query.values = [req.path.slice(9, -7)];
  console.log(`Review ID: ${req.path.slice(9, -7)}`);
  db.query(query)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
