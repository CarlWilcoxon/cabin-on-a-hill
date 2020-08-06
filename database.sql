
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "current_location_id" INT
);

CREATE TABLE "items_carried" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "item_id" INT,
  "is_carried" BOOLEAN
);

CREATE TABLE "location_complete" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "location_id" INT,
  "completed" BOOLEAN
);

CREATE TABLE "synonym_list" (
  "id" SERIAL PRIMARY KEY,
  "synonym" VARCHAR (60),
  "command_id" INT
);

CREATE TABLE "command" (
  "id" SERIAL PRIMARY KEY,
  "command_name" VARCHAR (60),
  "required_item_id" INT,
  "required_location_id" INT,
  "success_text" VARCHAR (1000),
  "failure_text" VARCHAR (1000)
);

CREATE TABLE "item" (
  "id" SERIAL PRIMARY KEY,
  "item_name" VARCHAR (80),
  "description" VARCHAR (1000)
);

CREATE TABLE "location" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (20),
  "description" VARCHAR (1000),
  "item_found_here_id" INT
);

CREATE TABLE "path" (
  "id" SERIAL PRIMARY KEY,
  "path_name" VARCHAR (100),
  "from_id" INT,
  "to_id" INT,
  "cardinal_direction" VARCHAR (10)
);

ALTER TABLE "location" ADD FOREIGN KEY ("item_found_here_id") REFERENCES "item" ("id");

ALTER TABLE "path" ADD FOREIGN KEY ("from_id") REFERENCES "location" ("id");

ALTER TABLE "path" ADD FOREIGN KEY ("to_id") REFERENCES "location" ("id");

ALTER TABLE "command" ADD FOREIGN KEY ("required_location_id") REFERENCES "location" ("id");

ALTER TABLE "command" ADD FOREIGN KEY ("required_item_id") REFERENCES "item" ("id");

ALTER TABLE "synonym_list" ADD FOREIGN KEY ("command_id") REFERENCES "command" ("id");

ALTER TABLE "items_carried" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "items_carried" ADD FOREIGN KEY ("item_id") REFERENCES "item" ("id");

ALTER TABLE "location" ADD FOREIGN KEY ("id") REFERENCES "user" ("current_location_id");

ALTER TABLE "location_complete" ADD FOREIGN KEY ("location_id") REFERENCES "location" ("id");

ALTER TABLE "location_complete" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

COMMENT ON TABLE "location" IS 'map nodes';

COMMENT ON TABLE "path" IS 'map edges';
