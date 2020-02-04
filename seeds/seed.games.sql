TRUNCATE 
    users,
    games
    RESTART IDENTITY CASCADE;

INSERT INTO users (email, password)
VALUES
    ('demo@test.com', 'password'),
    ('michael@dunder.com', 'password1'),
    ('dwight@dunder.com', 'password2'),
    ('pam@dunder.com', 'password3');

INSERT INTO games (user_id, course_name, date, course_par, front_score, back_score, notes) VALUES
    (1, 'Papago Disc Golf Course', '2019-01-03T00:00:00.000Z', 35, 20, 20, 'Lorem ipsum dolor sit amet, consectetur adipiscing.'),
    (1, 'Vista Del Camino Park', '2019-03-03T00:00:00.000Z', 40, 20, 20, 'Lorem ipsum dolor sit amet, consectetur adipiscing.'),
    (1, 'Mesa Disc Golf Club', '2019-04-03T00:00:00.000Z', 30, 15, 20, 'Lorem ipsum dolor sit amet, consectetur adipiscing.'),
    (2, 'Vista Del Camino Park', '2019-05-03T00:00:00.000Z', 40, 22, 22, 'Lorem ipsum dolor sit amet, consectetur adipiscing.'),
    (3, 'Scottsdale Disc Golf', '2019-07-03T00:00:00.000Z', 50, 30, 20, 'Lorem ipsum dolor sit amet, consectetur adipiscing.'),
    (4, 'Papago Disc Golf Course', '2019-11-03T00:00:00.000Z', 35, 25, 20, 'Lorem ipsum dolor sit amet, consectetur adipiscing.');

