/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();

client.connect();
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passop";

const app = express();
const port = 3000;

app.post("/", async (req, res) => {
  const db = client.db(dbName);

  const collection = db.collection("documents");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
