DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS vms;
DROP TABLE IF EXISTS app_services;
DROP TABLE IF EXISTS networks
DROP TABLE IF EXISTS webapps
DROP TABLE IF EXISTS dbs
DROP TABLE IF EXISTS blobs

CREATE TABLE users (
  id serial PRIMARY KEY,
  oid text NOT NULL UNIQUE,
);

CREATE TABLE groups (
  id serial PRIMARY KEY,
  name text NOT NULL
)

CREATE TABLE vms (
  id serial PRIMARY KEY,
  name text NOT NULL
)

CREATE TABLE app_services (
  id serial PRIMARY KEY,
  name text NOT NULL
)

CREATE TABLE networks (
  id serial PRIMARY KEY,
  name text NOT NULL
)

CREATE TABLE webapps (
  id serial PRIMARY KEY,
  name text NOT NULL,
  repo text NOT NULL
)

CREATE TABLE dbs (
  id serial PRIMARY KEY,
  name text NOT NULL,
  username text NOT NULL
)

CREATE TABLE blobs (
  id serial PRIMARY KEY,
  name text NOT NULL
)