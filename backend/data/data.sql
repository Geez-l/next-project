-- RESET EVERYTHING
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS measurement CASCADE;
DROP TABLE IF EXISTS penguins CASCADE;
DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS penguins_staging CASCADE;
DROP TYPE IF EXISTS sex_type CASCADE;

-- ENUM
CREATE TYPE sex_type AS ENUM ('male', 'female');

-- STAGING TABLE
-- Keep this flexible so CSV loading does not fail easily
CREATE TABLE penguins_staging (
    staging_id SERIAL PRIMARY KEY,
    species VARCHAR(50),
    island VARCHAR(50),
    bill_length_mm FLOAT,
    bill_depth_mm FLOAT,
    flipper_length_mm INT,
    body_mass_g INT,
    sex VARCHAR(20),              -- flexible in staging
    diet VARCHAR(50),
    life_stage VARCHAR(50),
    health_metrics VARCHAR(50),
    year_taken INT,
    image_url TEXT
);

-- DIMENSION TABLE
CREATE TABLE species (
    species_id SERIAL PRIMARY KEY,
    species VARCHAR(100) UNIQUE NOT NULL
);

-- FACT / MAIN TABLE
CREATE TABLE penguins (
    penguins_id SERIAL PRIMARY KEY,
    island VARCHAR(50),
    sex sex_type,
    diet VARCHAR(50),
    life_stage VARCHAR(50),
    health_metrics VARCHAR(100),
    year_taken INT,
    species_id INT REFERENCES species(species_id) ON DELETE SET NULL,
    UNIQUE(species_id, island, year_taken)
);

-- MEASUREMENT TABLE
CREATE TABLE measurement (
    measurement_id SERIAL PRIMARY KEY,
    bill_length_mm FLOAT,
    bill_depth_mm FLOAT,
    flipper_length_mm FLOAT,
    body_mass_g INT,
    penguins_id INT REFERENCES penguins(penguins_id) ON DELETE CASCADE
);

-- IMAGES TABLE
CREATE TABLE images (
    images_id SERIAL PRIMARY KEY,
    image_url TEXT,
    penguins_id INT REFERENCES penguins(penguins_id) ON DELETE CASCADE
);