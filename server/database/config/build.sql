BEGIN;

DROP TABLE IF EXISTS patients,appointments,history,users CASCADE;

CREATE TABLE patients(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR (100),
  birthday DATE,
  phone VARCHAR(30) NOT NULL UNIQUE,
  diseses TEXT
);

CREATE TABLE appointments(
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON UPDATE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  is_done BOOLEAN DEFAULT false,
  complaines TEXT
);

CREATE TABLE history(
  id SERIAL PRIMARY KEY,
  appointment_id INTEGER REFERENCES appointments(id) ON UPDATE CASCADE,
  descrption TEXT NOT NULL,
  price FLOAT DEFAULT 0,
  payment FLOAT DEFAULT 0,
  balance FLOAT NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL
);

COMMIT;
