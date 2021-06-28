-- Soccer League
-- Design a schema for a simple sports league. Your schema should keep track of

-- All of the teams in the league
-- All of the goals scored by every player for each game
-- All of the players in the league and their corresponding teams
-- All of the referees who have been part of each game
-- All of the matches played between teams
-- All of the start and end dates for season that a league has
-- The standings/rankings of each team in the league 
-- (This doesn’t have to be its own table if the data can be captured somehow).

DROP DATABASE IF EXISTS soccer_league_db;

CREATE DATABASE soccer_league_db;

\c soccer_league_db;

CREATE TABLE season
(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
);

CREATE TABLE teams
(
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(20) UNIQUE NOT NULL,
    wins INTEGER DEFAULT 0,
    ties INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    goals_for INTEGER DEFAULT 0,
    goals_against INTEGER DEFAULT 0,
    league_position INTEGER UNIQUE NOT NULL
);

CREATE TABLE players
(
    id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    team_name VARCHAR(20) REFERENCES teams(team_name),
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    position TEXT[],
    yellow_cards INTEGER DEFAULT 0,
    red_cards INTEGER DEFAULT 0
);

CREATE TABLE referees
(
    id SERIAL PRIMARY KEY,
    referee_name TEXT,
    phone_number VARCHAR(20) UNIQUE
);

CREATE TABLE matches
(
    id SERIAL PRIMARY KEY,
    season INTEGER REFERENCES seasons(id),
    game_time_and_date DATETIME2 NOT NULL,
    home_team TEXT REFERENCES teams(team_name) NOT NULL,
    away_team TEXT REFERENCES teams(team_name) NOT NULL,
    outcome VARCHAR(30) NOT NULL DEFAULT 'not played',
    home_goals INTEGER NOT NULL DEFAULT 0,
    away_goals INTEGER NOT NULL DEFAULT 0,
    referee TEXT REFERENCES referees(id),
    yellow_cards INTEGER DEFAULT 0,
    red_cards INTEGER DEFAULT 0
);

CREATE TABLE goals
(
    player_name TEXT REFERENCES players(player_name)
    team_for TEXT REFERENCES teams(team_name),
    team_against TEXT REFERENCES teams(team_name),
    match INTEGER REFERENCES matches(id)
);
