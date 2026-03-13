
-- Database set-up

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tables
-- Species, penguins, measurement, images

DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS penguins CASCADE;
DROP TABLE IF EXISTS measurements;
DROP TABLE IF EXISTS images;


-- Create Table for each

-- species
CREATE TABLE species (
species_id SERIAL PRIMARY KEY,
species VARCHAR(100) NOT NULL
);

-- penguins
CREATE TABLE penguins (
    penguins_id SERIAL PRIMARY KEY,
    island VARCHAR(50),
    sex VARCHAR(50),
    diet VARCHAR(50),
    life_stage VARCHAR(50),
    health_metrics VARCHAR(100),
    year_penguin INT, 
    -- FOREIGN KEY (species_id) REFERENCES species(species_id) ON DELETE SET NULL,
    species_id INT REFERENCES species(species_id) ON DELETE SET NULL
);

CREATE TABLE measurement (
    measurement_id PRIMARY KEY,
    bill_length_mm FLOAT,
    bill_depth_mm FLOAT,
    flipper_length_mm FLOAT, 
    body_mass_g INT,
    penguin_id INT REFERENCES penguins(penguin_id) ON DELETE CASCADE
);

CREATE TABLE images (
    images_id PRIMARY KEY,
    image_url TEXT
    penguin_id INT REFERENCES penguins(penguin_id) ON DELETE CASCADE

);


