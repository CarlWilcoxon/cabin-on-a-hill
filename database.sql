CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "items_carried" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "item_id" INT
);

CREATE TABLE "user_location" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT UNIQUE NOT NULL,
  "location_id" INT DEFAULT 1
);

CREATE TABLE "synonym_list" (
  "id" SERIAL PRIMARY KEY,
  "synonym" VARCHAR (60),
  "command_id" INT
);

INSERT INTO "synonym_list" ("synonym", "command_id")
VALUES 
('USE BLINDS', 2),
('USE BLINDS', 16),
('USE BLINDS', 17),
('LIGHT LANTERN', 3),
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
('USE SINK', 9),
('USE SINK', 29),
('GRAB LIGHTER', 10),
('WEST', 14),
('GO WEST', 14),
('OPEN DOOR', 15),
('OPEN', 15),
('DIE', 19),
('OPEN', 11),
('OPEN CABINET', 11),
('CLOSE DOOR', 20),
('CLOSE DOOR', 21),
('TACO', 22);

CREATE TABLE "command" (
  "id" SERIAL PRIMARY KEY,
  "command_name" VARCHAR (60),
  "required_item_id" INT,
  "required_location_id" INT,
  "success_text" VARCHAR (1000),
  "failure_text" VARCHAR (1000),
  "server_keyword" VARCHAR (30),
  "grab_item_id" INT
);


INSERT INTO "command" ("id", "command_name",  "required_item_id", "required_location_id", "success_text", "failure_text", "server_keyword", "grab_item_id")
VALUES (1, 'LOOK', null, null, null, 'You don''t see that.', 'LOOK', null),
(2, 'USE BLINDS', null, 1, 'You are swallowed up by darkness.', 'You don''t know how to do that.', 'DIE', null),
(3, 'LIGHT LANTERN', 3, 9, 'You light the LANTERN.', 'You don''t know how to do that.', 'MOVE', null),
(4, 'NORTH dark hall to default bathroom', null, 9, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null),
(5, 'EAST', null, null, 'You head EAST.', 'You walk into the wall.', 'MOVE', null),
(6, 'SOUTH', null, null, 'You head SOUTH.', 'You walk into the wall.', 'MOVE', null),
(7, 'WEST', null, null, 'You head WEST.', 'You walk into the wall.', 'MOVE', null),
(8, 'CLEAN', null, 1, 'You clean your room. You find your old BACKPACK and put it on.', 'What do you want to clean?', 'MOVE', null),
(9, 'USE SINK', null, 3,'You turn the faucet and murky water starts to dribble out.', 'What sink?', 'JOKE', null),
(10, 'GRAB LIGHTER', null, 7, 'You pick up the LIGHTER.' , 'You don''t know how to do that.', 'GRAB', 3),
(11, 'OPEN CABINET', null, 3, 'You open the CABINET and see a LIGHTER inside.', 'What cabinet?', 'MOVE', null),
(12, 'OPEN CABINET', 3, 3, 'You open the CABINET and it is empty.', 'What cabinet?', 'MOVE', null),
(13, 'NORTH bright hall to default bathroom', null, 10, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null),
(14, 'WEST', null, 9, 'You are swallowed up by darkness.', 'Error Code 14', 'DIE', null),
(15, 'OPEN BEDROOM DOOR', null, 15, 'The door swings open with a creak and then gets stuck on a lego.', 'You don''t think you can do that.', 'GRAB', 1),
(16, 'USE BLINDS open bedroom', null, 2, 'You are swallowed up by darkness.', 'You don''t know how to do that.', 'DIE', null),
(17, 'USE BLINDS closed bedroom', null, 15, 'You are swallowed up by darkness.', 'You don''t know how to do that.', 'DIE', null),
(19, 'DIE', null, null, 'You fall over dead.', '???', 'DIE', null),
(20, 'TRY TO CLOSE BEDROOM DOOR', 1, 2,'It''s stuck on a lego... I guess you didn''t clean your room that well...', 'You can''t do that here.', 'JOKE',null),
(21, 'TRY TO CLOSE BEDROOM DOOR', 1, 12,'It''s stuck on a lego... I guess you didn''t clean your room that well...', 'You can''t do that here.', 'JOKE',null),
(22, 'TACO', null, null, 'Now you feel hungry...', 'You don''t know how TACO.', 'JOKE', null),
(23, 'CLOSE CABINET', null, 7, 'You close the CABINET.', 'What cabinet?', 'MOVE', null),
(24, 'CLOSE CABINET', null, 8, 'You close the CABINET.', 'What cabinet?', 'MOVE', null),
(25, 'North from dark hall to open bathroom lighter taken', 3, 9, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null),
(26, 'North from dark hall to open bathroom', null, 9, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null),
(27, 'North from bright hall to open bathroom lighter taken', 3, 10, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null),
(28, 'North from bright hall to open bathroom', null, 10, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null),
(29, 'USE SINK', null, 13,'You turn the faucet and murky water starts to dribble out.', 'What sink?', 'JOKE', null);

CREATE TABLE "item" (
  "id" SERIAL PRIMARY KEY,
  "item_name" VARCHAR (80),
  "description" VARCHAR (1000)
);


INSERT INTO "item" ("id", "item_name", "description" )
VALUES (1, 'BACKPACK','It holds stuff for you.'),
(2, 'CANDLE', 'It smells like flowers.'),
(3, 'LIGHTER', 'More useful than matches.'),
(4, 'LIT CANDLE', 'It gives off a faint glow and pleasant smell.'),
(5, 'Candle & Lighter', 'Meta-item'),
(6, 'Knife', 'It doesn''t look like the sharpest one in the drawer.');

CREATE TABLE "location" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (20),
  "slug" VARCHAR (50),
  "description" VARCHAR (1000),
  "item_found_here_id" INT
);

INSERT INTO "location" ("id", "name", "slug", "description", "item_found_here_id" )
VALUES (1, 'Bedroom', 'Dirty Bedroom', 'Your bedroom looks so dirty that you can''t even get to the DOOR.', 1),
(2, 'Bedroom', 'Clean Bedroom Open Door', 'You are standing in your bedroom and look out into an ominous looking hallway to the WEST.', null),
(3, 'Bathroom', 'Bathroom default', 'There is a shiny porcelain toilet without any water in the bowl. The medicine CABINET with a crack in the glass hangs at an angle over a rust-stained SINK.', null),

(7, 'Bathroom', 'Bathroom open', 'There is a shiny porcelain toilet without any water in the bowl. The medicine CABINET over the SINK is open, inside you see a LIGHTER.', 3),
(8, 'Bathroom', 'Bathroom open lighter taken', 'There is a shiny porcelain toilet without any water in the bowl. The medicine CABINET over the SINK is open and empty.', null ),

(9, 'Hallway', 'Hallway dark', 'You stand in a dark and spooky hallway, you can''t even see the WEST end. There is an unlit LANTERN in a wall sconce. You notice an open doorway next to you to the NORTH, and the DOOR leading EAST to your bedroom.',null),
(10, 'Hallway', 'Hallway Bright', 'You stand in a long hallway, the LANTERN lights the way to the KITCHEN to the WEST. You notice a DOOR next to you to the NORTH, and a DOOR leading EAST to your bedroom.',null),

(11, 'Bathroom', 'Bathroom Bright open', 'There is a dirty TOILET. A medicine CABINET over the sink is open and empty. You are holding a lit candle.', null),
(12, 'Bedroom', 'Bright Bedroom', 'Your bedroom looks pretty good now, and smells nice with the candle you are holding.', null),

(13, 'Kitchen', 'Win condition', 'You stand in a kitchen. There is a rusty FRIDGE in the far corner, an old STOVE and a couple of DRAWERS by the SINK.', null),
(14, 'Bathroom', 'Bathroom Bright closed', 'There is a dirty TOILET. A medicine CABINET over the sink is closed. You are holding a lit candle.', null),
(15, 'Bedroom', 'Clean Bedroom closed Door', 'Your bedroom looks much cleaner now. You think you can reach your DOOR.', null);


CREATE TABLE "path" (
  "id" SERIAL PRIMARY KEY,
  "path_name" VARCHAR (100),
  "from_id" INT,
  "to_id" INT,
  "command_id" INT
);

INSERT INTO "path" ( "path_name", "from_id", "to_id", "command_id" )
VALUES ('Clean up room', 1, 15, 8),
('West from clean bedroom to dark hallway', 2 , 9, 7),
('East from dark hallway to clean bedroom', 9, 2, 5),
('North from dark hallway to default bathroom', 9 , 3 , 4),
('North from dark hallway to open bathroom', 9, 7, 28),
('North from dark hallway to open bathroom lighter taken', 9, 8, 27),
('North from bright hallway to open bathroom', 10, 7, 26),
('North from bright hallway to open bathroom lighter taken', 10, 8, 25),
('South from default bathroom to dark hallway', 3, 9, 6),
('South from bathroom to dark hallway', 7, 9, 6),
('South from bathroom to dark hallway', 8, 9, 6),
('South from default bathroom to bright hallway', 3, 10, 6),
('South from bathroom to bright hallway', 7, 10, 6),
('South from bathroom to bright hallway', 8, 10, 6),
('Open Bedroom door', 15, 2, 15),
('Close cabinet', 8, 3, 24),
('Close cabinet', 7, 3, 24),
('Open cabinet', 3, 7, 11),
('Open cabinet, no lighter', 3, 8, 12),
('Grab lighter', 7, 8, 10),
('Light lantern', 9, 10, 3),
('bright hall to kitchen', 10, 13, 7);

--ALTER TABLE "path" ADD FOREIGN KEY ("from_id") REFERENCES "location" ("id");

--ALTER TABLE "path" ADD FOREIGN KEY ("to_id") REFERENCES "location" ("id");

--ALTER TABLE "command" ADD FOREIGN KEY ("required_location_id") REFERENCES "location" ("id");

--ALTER TABLE "command" ADD FOREIGN KEY ("required_item_id") REFERENCES "item" ("id");

--ALTER TABLE "synonym_list" ADD FOREIGN KEY ("command_id") REFERENCES "command" ("id");

--ALTER TABLE "items_carried" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

--ALTER TABLE "items_carried" ADD FOREIGN KEY ("item_id") REFERENCES "item" ("id");

--ALTER TABLE "user_location" ADD FOREIGN KEY ("location_id") REFERENCES "location" ("id");

--COMMENT ON TABLE "location" IS 'map nodes';

--COMMENT ON TABLE "path" IS 'map edges';
