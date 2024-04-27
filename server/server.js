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

app.get("/api", (req, res) => {
  res.json({ tests: ["test1", "test2", "test3"] });
});

app.listen(port, () => {
  console.log(`Server is live at port ${port}`);
});
