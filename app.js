const express = require("express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const config = {
  host: "localhost",
  port: "5432",
  database: "restaurant",
  user: "postgres",
};
const db = pgp(config);

// app.get("/api/restaurants/, (req, res) => {
// db.query("SELECT * FROM restaurant").then((results) => {
//   console.log(results);
// });
// });

app.get("/api/restaurant/:id", (req, res) => {
  db.oneOrNone(
    "SELECT * FROM restaurant WHERE restaurant.id = $1",
    req.params.id
  )
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        res.status(404).json({});
      }
    })
    .catch((e) => {
      res.status(500),
        json({
          error: "Database Error",
        });
    });
});

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
