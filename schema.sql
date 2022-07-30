CREATE TABLE reviews(
  id integer NOT NULL,
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
  id integer NOT NULL,
  review_id integer NOT NULL,
  url varchar(200) NOT NULL,
  CONSTRAINT photos_pkey PRIMARY KEY(id)
);

\COPY photos FROM '/data/review_photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE characteristic_reviews(
  id integer NOT NULL,
  review_id integer NOT NULL,
  characteristic_id integer NOT NULL,
  "value" integer CHECK(value >= 0 AND value <= 5) NOT NULL,
  CONSTRAINT characteristic_reviews_pkey PRIMARY KEY(id)
);

\COPY characteristic_reviews FROM '/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE characteristics(
  id integer NOT NULL,
  product_id integer NOT NULL,
  "name" varchar(7) NOT NULL,
  CONSTRAINT characteristics_pkey PRIMARY KEY(id)
);

\COPY characteristics FROM '/data/characteristics.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE products (
  id integer NOT NULL,
  CONSTRAINT "products_pkey" PRIMARY KEY(id)
);


ALTER TABLE photos
  ADD CONSTRAINT photos_review_id_fkey
    FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristic_reviews
  ADD CONSTRAINT characteristic_reviews_review_id_fkey
    FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristic_reviews
  ADD CONSTRAINT characteristic_reviews_characteristic_id_fkey
    FOREIGN KEY (characteristics_id) REFERENCES characteristics(id);


INSERT INTO PRODUCTS SELECT DISTINCT ON (product_id) product_id FROM characteristics;

ALTER TABLE reviews
  ADD CONSTRAINT reviews_product_id_fkey
    FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE characteristics
  ADD CONSTRAINT characteristics_product_id_fkey
    FOREIGN KEY (product_id) REFERENCES products(id);
