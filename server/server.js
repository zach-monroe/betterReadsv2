import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import axios from "axios";
import password from "./config.js";

const app = express();
const port = 5000;

app.use(express.static("../public"));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  host: "localhost",
  database: "books",
  user: "postgres",
  password,
  port: 5432,
});

db.connect();

app.get("/api", async (req, res) => {
  let result;
  //allows users to sort by the query params.
  if (req.query.q) {
    if (req.query.q == "rating") {
      result = await db.query(
        "SELECT * FROM read INNER JOIN isbn ON read.id = isbn.book_id ORDER BY rating DESC",
      );
    } else if (req.query.q == "author") {
      result = await db.query(
        "SELECT * FROM read INNER JOIN isbn ON read.id = isbn.book_id ORDER BY author_lname",
      );
    }
  } else {
    result = await db.query(
      "SELECT * FROM read INNER JOIN isbn ON read.id = isbn.book_id",
    );
  }

  const books = result.rows;
  res.json({ books: books });
});

app.listen(port, () => {
  console.log(`Server is live at port ${port}`);
});
