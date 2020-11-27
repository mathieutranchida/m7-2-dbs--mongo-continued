"use strict";

const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");
const { disconnect } = require("process");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSeats = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("M7-2");
  console.log("connected");

  db.collection("seats")
    .find()
    .toArray((err, result) => {
      if (result) {
        const seats = {};
        result.forEach((seat) => {
          seats[seat._id] = seat;
        });
        // console.log(seats);
        res.status(200).json({
          status: 200,
          data: { seats: seats, numOfRows: 8, seatsPerRow: 12 },
        });
      } else {
        res.status(500).json({ status: 500, data: "Not found" });
      }

      client.close();
      console.log("disconnected!");
    });
};

const bookSeat = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("M7-2");
    console.log("connected");

    const _id = req.params._id;
    const query = { _id };
    const newValues = {
      $set: {
        isBooked: true,
        bookedBy: {
          fullName: req.body.fullName,
          email: req.body.email,
          creditCard: req.body.creditCard,
          expiration: req.body.expiration,
        },
      },
    };

    const result = await db.collection("seats").updateOne(query, newValues);
    // assert.equal(1, result.matchedCount);
    // assert.equal(1, result.modifiedCount);

    res.status(200).json({ status: 200, data: { _id, result } });

    client.close();
    console.log("disconnected!");
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports = { getSeats, bookSeat };
