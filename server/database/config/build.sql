BEGIN;

DROP TABLE IF EXISTS patients,appointments,history,users CASCADE;

CREATE TABLE patients(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR (100),
  birthday TIMESTAMPTZ,
  phone VARCHAR(30) NOT NULL UNIQUE,
  diseases TEXT
);

CREATE TABLE appointments(
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON UPDATE CASCADE,
  appointment_date TIMESTAMPTZ NOT NULL,
  appointment_time TIME NOT NULL,
  is_done BOOLEAN DEFAULT false,
  complaints TEXT
);

CREATE TABLE history(
  id SERIAL PRIMARY KEY,
  appointment_id INTEGER REFERENCES appointments(id) ON UPDATE CASCADE,
  description TEXT NOT NULL,
  price FLOAT DEFAULT 0,
  payment FLOAT DEFAULT 0
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL
);

COMMIT;
