import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import axios from "axios";
import password from "./config.js";

const app = express();
const port = 5000;

app.use(express.static("../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

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

app.post("/api/add", async (req, res) => {
  console.log(req.body);
  //For adding the users input into the database
  const title = req.body.title;
  const notes = req.body.notes;
  const author_fname = req.body.author_fname;
  const author_lname = req.body.author_lname;
  const rating = req.body.rating;
  const isbn = req.body.isbn;

  //API request for getting the ISBN
  //  const urlTitle = title.toLowerCase().replace(/ /g, "+");
  //  const urlAuthor = author_lname.toLowerCase();
  //  const isbnGet = await axios.get(
  //    "https://openlibrary.org/search.json?title=" +
  //      urlTitle +
  //      "&author=" +
  //      urlAuthor,
  //  );

  //validates if the isbn exists - if it does not it redirects to an error message.
  if (isbn) {
    //posting the information to the database.  It is placed here so users can't add their input unless it gets a valid isbn number.
    try {
      const readResult = await db.query(
        "INSERT INTO read (author_lname, title, notes, rating, author_fname) VALUES ($1, $2, $3, $4, $5) RETURNING (id)",
        [author_lname, title, notes, rating, author_fname],
      );

      //gets the id from the post to "read" table and connect with the "isbn" table
      const id = readResult.rows[0].id;

      //posts the isbn number and the book id to the "isbn" table
      const isbnPost = await db.query(
        "INSERT INTO isbn (book_id, book_isbn) VALUES ($1, $2)",
        [id, isbn],
      );
    } catch (err) {
      console.log(err.body);
    }
  }
});

app.post("/api/delete", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;

  try {
    await db.query(
      "DELETE FROM read USING isbn WHERE id = isbn.book_id AND id = ($1)",
      [id],
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is live at port ${port}`);
});
