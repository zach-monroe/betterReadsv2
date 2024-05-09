import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import password from "./config.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

const app = express();
const port = 5000;
const saltRounds = 10;

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
      res.status(200).send("Book Added Successfully");
    } catch (err) {
      console.log(err.body);
    }
  }
});

app.get("/api/edit/:id", async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const result = await db.query(
    "SELECT * FROM read INNER JOIN isbn ON read.id = isbn.book_id WHERE read.id = ($1)",
    [id],
  );
  const book = result.rows;
  console.log(book);
  res.json({ book: book });
});

app.post("/api/update", async (req, res) => {
  const title = req.body.title;
  const notes = req.body.notes;
  const author_fname = req.body.author_fname;
  const author_lname = req.body.author_lname;
  const rating = req.body.rating;
  const id = req.body.id;

  try {
    const readResult = await db.query(
      "UPDATE read SET author_lname = $1, title = $2, notes = $3, rating = $4, author_fname = $5 WHERE id = $6",
      [author_lname, title, notes, rating, author_fname, id],
    );
  } catch (err) {
    console.log(err.body);
  }

  res.status(200).send("Update Posted!");
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
});

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await db.query("SELECT * from users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      console.log(result.rows);
      const user = result.rows[0];
      const storedHash = user.hash;
      const id = user.id;
      const user_fname = user.user_fname;

      bcrypt.compare(password, storedHash, (err, result) => {
        if (err) {
          console.log("error logging in:", err);
        } else {
          if (result) {
            console.log("signed in");
            const jwtToken = jwt.sign({ id, email }, process.env.SECRET_KEY);
            //sendback cookie/authentication data
            //
            res.json({
              message: `Welcome back ${user.user_fname}`,
              token: jwtToken,
              name: user_fname,
              email: email,
              id: id,
            });
            return;
          } else {
            console.log("wrong password");
            res.status(401).json({ error: "Password incorrect!" });
            return;
          }
        }
      });
    } else {
      console.log("not a user");
      res.status(404).json({ error: "User not found, try signing up!" });
      return;
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const user_fname = req.body.user_fname;
  const user_lname = req.body.user_lname;

  try {
    const testEmail = await db.query("SELECT * from users WHERE email = $1", [
      email,
    ]);

    if (testEmail.rows.length > 0) {
      console.log("User already exists");
      res.status(401).json({ error: "Email already exists, try logging in." });
      return;
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error making hash:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, hash, user_fname, user_lname) VALUES ($1, $2, $3, $4) RETURNING (id)",
            [email, hash, user_fname, user_lname],
          );
          const id = result.rows[0].id;
          const jwtToken = jwt.sign({ id, email }, process.env.SECRET_KEY);
          res.json({
            message: `Welcome ${user_fname}`,
            token: jwtToken,
            name: user_fname,
            email: email,
            id: id,
          });

          console.log(
            `New user added ${user_fname} ${user_lname}. Their email is ${email} and password is ${password}`,
          );
          return;
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/signup", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server is live at port ${port}`);
});
