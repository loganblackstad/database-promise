const express = require("express");
const pgp = require("pg-promise")();
const PORT = process.env.PORT || 3000;

const app = express();

const config = {
  host: "localhost",
  port: "5432",
  database: "restaurant",
  user: "postgres",
};
const db = pgp(config);

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
