CREATE DATABASE reviews;
\c reviews

CREATE TABLE reviews(
  id SERIAL NOT NULL,
  product_id integer NOT NULL,
  rating integer CHECK (rating >= 0 AND rating <= 5)NOT NULL,
  "date" bigint NOT NULL,
  summary varchar(200) NOT NULL,
  body varchar(500) NOT NULL,
  recommend bool NOT NULL,
  reported bool NOT NULL,
  "name" varchar(30) NOT NULL,
  email varchar(50) NOT NULL,
  response varchar(500),
  helpfulness integer CHECK (helpfulness >= 0) NOT NULL,
  CONSTRAINT reviews_pkey PRIMARY KEY(id)
);

\COPY reviews FROM '/data/reviews.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE photos(
  id SERIAL NOT NULL,
  review_id integer NOT NULL,
  url varchar(200) NOT NULL,
  CONSTRAINT photos_pkey PRIMARY KEY(id)
);

\COPY photos FROM '/data/review_photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE characteristic_reviews(
  id SERIAL NOT NULL,
  review_id integer NOT NULL,
  characteristic_id integer NOT NULL,
  "value" integer CHECK(value >= 0 AND value <= 5) NOT NULL,
  CONSTRAINT characteristic_reviews_pkey PRIMARY KEY(id)
);

\COPY characteristic_reviews FROM '/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE characteristics(
  id SERIAL NOT NULL,
  product_id integer NOT NULL,
  "name" varchar(7) NOT NULL,
  CONSTRAINT characteristics_pkey PRIMARY KEY(id)
);

\COPY characteristics FROM '/data/characteristics.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE photos
  ADD CONSTRAINT photos_review_id_fkey
    FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristic_reviews
  ADD CONSTRAINT characteristic_reviews_review_id_fkey
    FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristic_reviews
  ADD CONSTRAINT characteristic_reviews_characteristic_id_fkey
    FOREIGN KEY (characteristics_id) REFERENCES characteristics(id);

SELECT setval('reviews_id_seq'::regclass, (SELECT MAX(id) FROM reviews));
SELECT setval('photos_id_seq'::regclass, (SELECT MAX(id) FROM photos));
SELECT setval('characteristics_id_seq'::regclass, (SELECT MAX(id) FROM characteristics));
SELECT setval('characteristic_reviews_id_seq'::regclass, (SELECT MAX(id) FROM characteristic_reviews));