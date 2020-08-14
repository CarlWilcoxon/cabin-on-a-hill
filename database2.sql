CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "current_location_id" INT DEFAULT 1
);

CREATE TABLE "items_carried" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "item_id" INT
);


CREATE TABLE "synonym_list" (
  "id" SERIAL PRIMARY KEY,
  "synonym" VARCHAR (60),
  "command_id" INT
);

INSERT INTO "synonym_list" ("synonym", "command_id")
VALUES ('LOOK', 1),
('EXAMINE', 1),
('USE BLINDS', 2),
('LIGHT CANDLE', 3),
('NORTH', 4),
('GO NORTH', 4),
('EAST', 5),
('GO EAST', 5),
('SOUTH', 6),
('GO SOUTH', 6),
('WEST', 7),
('GO WEST', 7),
('CLEAN', 8),
('CLEAN ROOM', 8),
('CLEAN MESS', 8),
('CLEAN UP', 8),
('CLEAN UP ROOM', 8),
('CLEAN UP MESS', 8),
('GRAB LIGHTER', 9),
('GRAB LIGHTER', 10),
('GRAB CANDLE', 11),
('GRAB CANDLE', 12),
('GRAB CANDLE', 13),
('WEST', 14);

CREATE TABLE "command" (
  "id" SERIAL PRIMARY KEY,
  "command_name" VARCHAR (60),
  "required_item_id" INT,
  "required_location_id" INT,
  "success_text" VARCHAR (1000),
  "failure_text" VARCHAR (1000),
  "server_keyword" VARCHAR (30),
  "server_target_id" INT
);

select * from "path";
UPDATE "user"
SET "current_location_id" = 1
WHERE "id" = 1;`
                              
INSERT INTO "command" ("id", "command_name",  "required_item_id", "required_location_id", "success_text", "failure_text", "server_keyword", "server_target_id")
VALUES (1, 'LOOK', null, null, null, 'You don''t see that.', 'LOOK', null),
(2, 'USE BLINDS', null, 1, 'You are swallowed up by darkness.', 'You don''t know how to do that.', 'DIE', null),
(3, 'LIGHT CANDLE', 5, null, 'You light the candle.', 'You don''t know how to do that.', 'GRAB', 4),
(4, 'NORTH', null, null, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null),
(5, 'EAST', null, null, 'You head EAST.', 'You walk into the wall.', 'MOVE', null),
(6, 'SOUTH', null, null, 'You head SOUTH.', 'You walk into the wall.', 'MOVE', null),
(7, 'WEST', null, null, 'You head WEST.', 'You walk into the wall.', 'MOVE', null),
(8, 'CLEAN', null, 1, 'You clean your room. It looks a lot better in here.', 'What do you want to clean?', 'MOVE', null),
(9, 'GRAB LIGHTER', null, 5, 'You pick up the LIGHTER' , 'You don''t know how to do that.', 'GRAB', 3),
(10, 'GRAB LIGHTER', null, 7, 'You pick up the LIGHTER' , 'You don''t know how to do that.', 'GRAB', 3),
(11, 'GRAB CANDLE', null, 3, 'You pick up the CANDLE' , 'You don''t know how to do that.', 'GRAB', 2),
(12, 'GRAB CANDLE', null, 7, 'You pick up the CANDLE' , 'You don''t know how to do that.', 'GRAB', 2),
(13, 'GRAB CANDLE', null, 8, 'You pick up the CANDLE' , 'You don''t know how to do that.', 'GRAB', 2),
(14, 'WEST', null, 9, 'You are swallowed up by the darkness.', 'You walk into the wall.', 'DIE', null);

CREATE TABLE "item" (
  "id" SERIAL PRIMARY KEY,
  "item_name" VARCHAR (80),
  "description" VARCHAR (1000)
);


INSERT INTO "item" ("id", "item_name", "description" )
VALUES (1, 'BACKPACK','It holds stuff for you.'),
(2, 'CANDLE', 'It smells like flowers.'),
(3, 'LIGHTER', 'Don''t play with it.'),
(4, 'LIT CANDLE', 'It gives off a faint glow and pleasant smell.'),
(5, 'Candle & Lighter', 'Meta-item');

CREATE TABLE "location" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (20),
  "slug" VARCHAR (50),
  "description" VARCHAR (1000),
  "item_found_here_id" INT
);

INSERT INTO "location" ("id", "name", "slug", "description", "item_found_here_id" )
VALUES (1, 'Bedroom', 'Dirty Bedroom', 'What your bedroom looks like.', 1),
(2, 'Bedroom', 'Clean Bedroom', 'Your bedroom looks much cleaner now.', null),
(3, 'Bathroom', 'Bathroom default', 'There is a short CANDLE sitting on the tank of the TOILET. A medicine CABINET with a crack in the glass hangs at an angle over the sink.', 2),
(4, 'Bathroom', 'Bathroom closed candle taken', 'There is a dirty TOILET. A medicine CABINET with a crack in the glass hangs ajar over the sink.', null),
(5, 'Bathroom', 'Bathroom open candle taken', 'There is a dirty TOILET. A medicine CABINET over the sink is open, inside you see a LIGHTER.', 3),
(6, 'Bathroom', 'Bathroom open candle + lighter taken', 'There is a dirty TOILET. A medicine CABINET over the sink is open and empty.', null),
(7, 'Bathroom', 'Bathroom open', 'There is a short CANDLE sitting on the tank of the TOILET. A medicine CABINET over the sink is open, inside you see a LIGHTER.', 4),
(8, 'Bathroom', 'Bathroom open lighter taken', 'There is a short CANDLE sitting on the tank of the TOILET. A medicine CABINET over the sink is open and empty.', 2 ),
(9, 'Hallway', 'Hallway dark', 'You stand in a dark and spooky hallway, you can''t even see the WEST end. You notice a DOOR next to you to the NORTH, and a DOOR leading EAST to your bedroom.',null),
(10, 'Hallway', 'Hallway Bright', 'You stand in a long and spooky hallway, your little candle lights the way to the KITCHEN to the WEST. You notice a DOOR next to you to the NORTH, and a DOOR leading EAST to your bedroom.',null),
(11, 'Bathroom', 'Bathroom Bright', 'There is a dirty TOILET. A medicine CABINET over the sink is open and empty. You are holding a lit candle.', null),
(12, 'Bedroom', 'Bright Bedroom', 'Your bedroom looks pretty good now, and smells nice with the candle you are holding.', null),
(13, 'Kitchen', 'Win condition', 'Kitchen', 'You make it to the kitchen.', null);


CREATE TABLE "path" (
  "id" SERIAL PRIMARY KEY,
  "path_name" VARCHAR (100),
  "from_id" INT,
  "to_id" INT,
  "command_id" INT
  );

INSERT INTO "path" ( "id", "path_name", "from_id", "to_id", "command_id" )
VALUES (1, 'Clean up room', 1, 2, 8),
(2, 'West from clean bedroom to dark hallway', 2 , 7 , 7),
(3, 'East from dark hallway to clean bedroom', 7, 2, 5),
(4, 'North from dark hallway to default bathroom', 7 , 3 , 4),
(5, '');

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
