const { MongoClient } = require("mongodb");
const assert = require("assert");
const fs = require("file-system");
// const { connect } = require("http2");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const generateSeats = () => {
  const seats = [];
  const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
  for (let r = 0; r < row.length; r++) {
    for (let s = 1; s < 13; s++) {
      seats.push({
        _id: `${row[r]}-${s}`,
        price: 225,
        isBooked: Math.random() * 6 < 1,
      });
    }
  }
  return seats;
};

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("M7-2");
  console.log("connected");

  const seats = generateSeats();
  const result = await db.collection("seats").insertMany(seats);
  assert.equal(seats.length, result.insertedCount);

  client.close();
  console.log("disconnected!");
};

batchImport();
