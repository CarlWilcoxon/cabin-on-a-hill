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
('USE BLINDS', 3),
('USE BLINDS', 4),
('CLOSE BLINDS', 2),
('CLOSE BLINDS', 3),
('CLOSE BLINDS', 4),
('LIGHT LANTERN', 5),
('DIE', 6),

('NORTH', 7),
('GO NORTH', 7),
('NORTH', 8),
('GO NORTH', 8),
('NORTH', 9),
('GO NORTH', 9),
('NORTH', 10),
('GO NORTH', 10),
--('NORTH', 11),
--('GO NORTH', 11),

('SOUTH', 12),
('GO SOUTH', 12),
('SOUTH', 13),
('GO SOUTH', 13),
('SOUTH', 14),
('GO SOUTH', 14),
('SOUTH', 15),
('GO SOUTH', 15),
('SOUTH', 16),
('GO SOUTH', 16),

('EAST', 17),
('GO EAST', 17),
('EAST', 18),
('GO EAST', 18),
('EAST', 19),
('GO EAST', 19),

('WEST', 20),
('GO WEST', 20),
('WEST', 21),
('GO WEST', 21),
('WEST', 22),
('GO WEST', 22),
('WEST', 23),
('GO WEST', 23),

('CLEAN', 24),
('CLEAN ROOM', 24),
('CLEAN MESS', 24),
('CLEAN UP', 24),
('CLEAN UP ROOM', 24),
('CLEAN UP MESS', 24),

('USE SINK', 25),
('USE SINK', 26),
('USE SINK', 27),
('USE SINK', 28),

('GRAB LIGHTER', 29),
('TAKE LIGHTER', 29),
('PICK UP LIGHTER', 29),
('STEAL LIGHTER', 29),

('OPEN', 30),
('OPEN CABINET', 30),
('OPEN', 31),
('OPEN CABINET', 31),

('CLOSE', 32),
('CLOSE CABINET', 32),
('CLOSE', 33),
('CLOSE CABINET', 33),

('OPEN BEDROOM DOOR', 34),
('OPEN DOOR', 34),
('OPEN', 34),

('CLOSE DOOR', 35),
('CLOSE BEDROOM DOOR', 35),
('CLOSE DOOR', 36),
('CLOSE BEDROOM DOOR', 36),
('CLOSE DOOR', 37),
('CLOSE BEDROOM DOOR', 37),

('TACO', 38);

CREATE TABLE "command" (
  "id" SERIAL PRIMARY KEY,
  "command_slug" VARCHAR (60),
  "required_item_id" INT,
  "required_location_id" INT,
  "success_text" VARCHAR (1000),
  "failure_text" VARCHAR (1000),
  "server_keyword" VARCHAR (30),
  "grab_item_id" INT,
  "destination_id" INT
);


INSERT INTO "command" ("id", "command_slug",  "required_item_id", "required_location_id", "success_text", "failure_text", "server_keyword", "grab_item_id", "destination_id")
VALUES (1, 'LOOK', null, null, 'Error Code 1', 'You don''t see that.', 'LOOK', null, null),
(2, 'USE BLINDS', null, 1, 'You are swallowed up by darkness.', 'You don''t know how to do that.', 'DIE', null, null),
(3, 'USE BLINDS open bedroom', null, 2, 'You are swallowed up by darkness.', 'You don''t know how to do that.', 'DIE', null, null),
(4, 'USE BLINDS closed bedroom', null, 15, 'You are swallowed up by darkness.', 'You don''t know how to do that.', 'DIE', null, null),
(5, 'LIGHT LANTERN', 3, 9, 'You light the LANTERN.', 'You don''t know how to do that.', 'GRAB', 5, 10),
(6, 'DIE', null, null, 'You fall over dead.', '???', 'DIE', null, null),
(7, 'NORTH dark hall to default bath', -3, 9, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null, 3),
(8, 'NORTH bright hall to default bath', -3, 10, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null, 3),
(9, 'NORTH bright hall to open bath lighter taken', 3, 10, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null, 8),
(10, 'NORTH from dark hall to open bath lighter taken', 3, 9, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null, 8),
--(11, 'NORTH from dark hall to open bath', null, 9, 'You head NORTH.', 'You walk into the wall.', 'MOVE', null, 7),

(12, 'SOUTH from default bath to dark hall', -5, 3, 'You head SOUTH.', 'You walk into the wall.', 'MOVE', null, 9),
(13, 'SOUTH from open bath to dark hall', -5, 7, 'You head SOUTH.', 'You walk into the wall.', 'MOVE', null, 9),
(14, 'SOUTH from open bath lighter taken', 3, 8, 'You head SOUTH.', 'You walk into the wall.', 'MOVE', null, 9),
(15, 'SOUTH from default bath to bright hall', 5, 3, 'You head SOUTH.', 'You walk into the wall.', 'MOVE', null, 10),
(16, 'SOUTH from open bath to bright hall', 5, 8, 'You head SOUTH.', 'You walk into the wall.', 'MOVE', null, 10),

(17, 'EAST from dark hall to bed', null, 9, 'You head EAST.', 'You walk into the wall.', 'MOVE', null, 2),
(18, 'EAST from bright hall to bed', 5, 10, 'You head EAST.', 'You walk into the wall.', 'MOVE', null, 2),
(19, 'EAST from kitchen to bright hall', 5, 13, 'You head EAST.', 'You walk into the wall.', 'MOVE', null, 10),

(20, 'WEST from bed to dark hall', -5, 2, 'You head WEST.', 'You walk into the wall.', 'MOVE', null, 9),
(21, 'WEST from bed to bright hall', 5, 2, 'You head WEST.', 'You walk into the wall.', 'MOVE', null, 10),
(22, 'WEST from bright hall to kitchen', 5, 10, 'You head WEST.', 'You walk into the wall.', 'MOVE', null, 13),
(23, 'WEST', null, 9, 'You are swallowed up by darkness.', 'Error Code 23', 'DIE', null, null),

(24, 'CLEAN your room', null, 1, 'You clean your room. You find your old BACKPACK and put it on.', 'What do you want to clean?', 'MOVE', null, 15),

(25, 'USE SINK ', null, 3,'You turn the faucet and murky water dribbles out for a moment before you turn it back off.', 'What sink?', 'JOKE', null, null),
(26, 'USE SINK', null, 7,'You turn the faucet and murky water dribbles out for a moment before you turn it back off.', 'What sink?', 'JOKE', null, null),
(27, 'USE SINK', null, 8,'You turn the faucet and murky water dribbles out for a moment before you turn it back off.', 'What sink?', 'JOKE', null, null),
(28, 'USE SINK', null, 13,'You turn the faucet and murky water dribbles out for a moment before you turn it back off.', 'What sink?', 'JOKE', null, null),

(29, 'GRAB LIGHTER', null, 7, 'You pick up the LIGHTER.' , 'You don''t know how to do that.', 'GRAB', 3, 8),

(30, 'OPEN CABINET', -3, 3, 'You open the CABINET and see a LIGHTER inside.', 'What cabinet?', 'MOVE', null, 7),
(31, 'OPEN CABINET', 3, 3, 'You open the CABINET and it is empty.', 'What cabinet?', 'MOVE', null, 8),

(32, 'CLOSE CABINET', null, 7, 'You close the CABINET.', 'What cabinet?', 'MOVE', null, 3),
(33, 'CLOSE CABINET', null, 8, 'You close the CABINET.', 'What cabinet?', 'MOVE', null, 3),

(34, 'OPEN BEDROOM DOOR', null, 15, 'The door swings open with a creak and then gets stuck on a lego.', 'You don''t think you can do that.', 'GRAB', 1, 2),
(35, 'TRY TO CLOSE STUCK DOOR in bedroom', 1, 2,'It''s stuck on a lego... I guess you didn''t clean your room that well...', 'You can''t do that here.', 'JOKE',null, null),
(36, 'TRY TO CLOSE STUCK DOOR in dark hall', 1, 9,'It''s stuck on a lego... I guess you didn''t clean your room that well...', 'You can''t do that here.', 'JOKE', null, null),
(37, 'TRY TO CLOSE STUCK DOOR in bright hall', 1, 10,'It''s stuck on a lego... I guess you didn''t clean your room that well...', 'You can''t do that here.', 'JOKE', null, null),
(38, 'TACO', null, null, 'Now you feel hungry...', 'You don''t know how TACO.', 'JOKE', null, null);

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
(5, 'LANTERN LIT', 'Meta-item'),
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

(13, 'Kitchen', 'Win condition', 'You stand in a kitchen. There is a rusty FRIDGE in the far corner, an old STOVE and a couple of DRAWERS by the SINK.', 6),
(14, 'Bathroom', 'Bathroom Bright closed', 'There is a dirty TOILET. A medicine CABINET over the sink is closed. You are holding a lit candle.', null),
(15, 'Bedroom', 'Clean Bedroom closed Door', 'Your bedroom looks much cleaner now. You think you can reach your DOOR.', null);



ALTER TABLE "command" ADD FOREIGN KEY ("required_location_id") REFERENCES "location" ("id");

ALTER TABLE "command" ADD FOREIGN KEY ("destination_id") REFERENCES "location" ("id");

ALTER TABLE "synonym_list" ADD FOREIGN KEY ("command_id") REFERENCES "command" ("id");

ALTER TABLE "items_carried" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "items_carried" ADD FOREIGN KEY ("item_id") REFERENCES "item" ("id");

ALTER TABLE "user_location" ADD FOREIGN KEY ("location_id") REFERENCES "location" ("id");

ALTER TABLE "location" ADD FOREIGN KEY ("item_found_here_id") REFERENCES "item" ("id");


COMMENT ON TABLE "location" IS 'map nodes';

COMMENT ON TABLE "command" IS 'map edges';
