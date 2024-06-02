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

  result = await db.query(
    "SELECT read.*, isbn.*, users.user_fname as user_fname, users.user_lname as user_lname FROM read INNER JOIN isbn ON read.id = isbn.book_id INNER JOIN users on read.user_id = users.id",
  );

  const books = result.rows;
  res.json({ books: books });
});

app.post("/api/add", async (req, res) => {
  console.log(req.body);
  //For adding the users input into the database
  const title = req.body.title;
  const author_fname = req.body.author_fname;
  const author_lname = req.body.author_lname;
  const rating = req.body.rating;
  const isbn = req.body.isbn;
  const user_id = req.body.user_id;

  //validates if the isbn exists - if it does not it redirects to an error message.
  if (isbn) {
    //posting the information to the database.  It is placed here so users can't add their input unless it gets a valid isbn number.
    try {
      const readResult = await db.query(
        "INSERT INTO read (author_lname, title, rating, author_fname, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING (id)",
        [author_lname, title, rating, author_fname, user_id],
      );

      //gets the id from the post to "read" table and connect with the "isbn" table
      const id = readResult.rows[0].id;

      //posts the isbn number and the book id to the "isbn" table
      const isbnPost = await db.query(
        "INSERT INTO isbn (book_id, book_isbn) VALUES ($1, $2)",
        [id, isbn],
      );
      res.status(200).json({ message: "Book added successfully!" });
    } catch (err) {
      res.status(400).json({ message: "an error occured" });
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
  const author_fname = req.body.author_fname;
  const author_lname = req.body.author_lname;
  const rating = req.body.rating;
  const id = req.body.id;

  try {
    const readResult = await db.query(
      "UPDATE read SET author_lname = $1, title = $2, rating = $3, author_fname = $4 WHERE id = $5",
      [author_lname, title, notes, rating, author_fname, id],
    );
  } catch (err) {
    console.log(err.body);
    res.status(400).json({ message: "Update could not be posted." });
  }

  res.status(200).json({ message: "Update Posted!" });
});

app.post("/api/delete", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const client_id = req.body.user;

  try {
    await db.query(
      "DELETE FROM read USING isbn WHERE id = isbn.book_id AND id = ($1) AND user_id = ($2)",
      [id, client_id],
    );
    res.sendStatus(204);
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

app.get("/api/profile/:id", async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  try {
    const result = await db.query(
      "SELECT read.*, isbn.* FROM read INNER JOIN isbn ON read.id = isbn.book_id WHERE user_id = $1 ",
      [id],
    );
    console.log(result.rows);
    res.json({ books: result?.rows });
  } catch (error) { }
});

//getting highlights for a specific book based on query params
app.get("/api/highlights/", async (req, res) => {
  const book_id = req.query.book_id;
  const user_id = req.query.user_id;

  try {
    const result = await db.query(
      "SELECT * FROM highlights WHERE book_id = $1 AND user_id = $2 ORDER BY entry ASC",
      [book_id, user_id],
    );
    if (result.rows?.length === 0) {
      res.json({
        highlights: [
          {
            user_id: parseInt(user_id, 10),
            book_id: parseInt(book_id, 10),
            entry: 1,
            highlight: "No Highlights Added",
          },
        ],
      });
    } else {
      res.json({ highlights: result.rows });
    }
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
});

//adding and updating a highlight (rolled these into the same endpoint for ease of use on the front end)
app.post("/api/highlights/", async (req, res) => {
  const book_id = req.body.book_id;
  const user_id = req.body.user_id;
  const entry = req.body.entry;
  const highlight = req.body.highlight;
  console.log(JSON.stringify(req.body));

  try {
    const highlightExists = await db.query(
      "SELECT * FROM highlights WHERE user_id = $1 AND book_id= $2 AND entry = $3",
      [user_id, book_id, entry],
    );
    if (highlightExists.rows?.length > 0) {
      const result = await db.query(
        "UPDATE highlights SET highlight = $1 WHERE user_id = $2 AND book_id = $3 AND entry = $4 RETURNING *",
        [highlight, user_id, book_id, entry],
      );
      res.status(201).json({
        message: "Highlight Updated Successfully",
        highlight: result.rows[0],
      });
    } else {
      const result = await db.query(
        "INSERT INTO highlights (book_id, user_id, entry, highlight) VALUES ($1, $2, $3, $4) RETURNING *",
        [book_id, user_id, entry, highlight],
      );
      res.status(201).json({
        message: "Highlight added successfully",
        highlight: result.rows[0],
      });
      console.log("added a new highlight");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/highlights/:user_id/:book_id/:entry", async (req, res) => {
  const user_id = req.params.user_id;
  const book_id = req.params.book_id;
  const entry = req.params.entry;

  try {
    // Check if the highlight exists
    const existingHighlight = await db.query(
      "SELECT * FROM highlights WHERE user_id = $1 AND book_id = $2 AND entry = $3",
      [user_id, book_id, entry],
    );

    if (existingHighlight.rows.length === 0) {
      return res.status(404).json({ message: "Highlight not found" });
    }

    // Delete the highlight
    await db.query(
      "DELETE FROM highlights WHERE user_id = $1 AND book_id = $2 AND entry = $3",
      [user_id, book_id, entry],
    );

    res.status(203).json({ message: "Highlight deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is live at port ${port}`);
});
