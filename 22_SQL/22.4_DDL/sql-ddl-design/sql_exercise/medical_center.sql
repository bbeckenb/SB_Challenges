-- Medical Center
-- Design the schema for a medical center.

-- A medical center employs several doctors
-- A doctors can see many patients
-- A patient can be seen by many doctors
-- During a visit, a patient may be diagnosed to have one or more diseases.

DROP DATABASE IF EXISTS medical_center_db;

CREATE DATABASE medical_center_db;

\c medical_center_db;

CREATE TABLE doctors
(
    id SERIAL PRIMARY KEY,
    doctor_name TEXT UNIQUE NOT NULL,
    pay INTEGER,
    specialization TEXT,
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE patients
(
    id SERIAL PRIMARY KEY,
    patient_name TEXT UNIQUE NOT NULL,
    insurance TEXT,
    primary_doctor INTEGER REFERENCES doctors(id),
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE visits 
(
  id SERIAL PRIMARY KEY,
  visit_date DATE,
  patient_name INTEGER REFERENCES patients(id),
  doctor_name INTEGER REFERENCES doctors(id),
  patient_issue_desc TEXT NOT NULL,
  diagnosis TEXT [] NOT NULL,
  next_step TEXT NOT NULL,
);