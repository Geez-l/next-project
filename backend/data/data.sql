
-- Database set-up

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tables
-- Species, penguins, measurement, images

DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS penguins CASCADE;
DROP TABLE IF EXISTS measurements;
DROP TABLE IF EXISTS images;


-- Create Table for each

CREATE TABLE species (
species_id SERIAL PRIMARY KEY,
species VARCHAR(100) NOT NULL
);

CREATE TABLE penguins (
    species_id 
)


