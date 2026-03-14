-- create staging

DROP TABLE IF EXISTS penguins_staging CASCADE;
DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS penguins CASCADE;
DROP TABLE IF EXISTS measurements CASCADE;
DROP TABLE IF EXISTS images CASCADE;


CREATE TYPE sex_type AS ENUM ("male", "female");

CREATE TABLE penguins_staging (
    staging_id SERIAL PRIMARY KEY;
    species VARCHAR(50);
    island VARCHAR(50);
    bill_length_mm FLOAT;
    bill_depth_mm FLOAT;
    flipper_length_mm INT;
    body_mass_g INT;
    sex sex_type NOT NULL;
    diet VARCHAR(50);
    life_stage VARCHAR(50);
    health_metrics VARCHAR(50);
    year_taken INT;
    image_url TEXT;
);

-- create the tables for each

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

