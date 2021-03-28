BEGIN;

DROP TABLE IF EXISTS patients,appointments,history,users, CASCADE

CREATE TABLE patients(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR (100),
  birthday DATE,
  phone VARCHAR(30) NOT NULL UNIQUE,
);

CREATE TABLE appointments(
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON UPDATE CASCADE,
  appointment_date DATE,
  appointment_time TIME,
  is_done BOOLEAN,
  complaines TEXT,
  diseses TEXT
);

CREATE TABLE history(
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON UPDATE CASCADE ,
  descrption TEXT,
  price FLOAT,
  payment FLOAT,
  balance FLOAT,
  appointment_date TIME DEFAULT current_time
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
);

COMMIT;
