const router = require("express").Router();
const { getSeats, bookSeat } = require("./handlers");

const NUM_OF_ROWS = 8;
const SEATS_PER_ROW = 12;

// Code that is generating the seats.
// ----------------------------------
const seats = {};
const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
    seats[`${row[r]}-${s}`] = {
      price: 225,
      isBooked: false,
    };
  }
}
// ----------------------------------

router.get("/get-seats", getSeats);

router.put("/book-seat/:_id", bookSeat);

// router.post("/api/book-seat", async (req, res) => {
//   const { seatId, creditCard, expiration } = req.body;

//   if (!state) {
//     state = {
//       bookedSeats: randomlyBookSeats(30),
//     };
//   }

//   await delay(Math.random() * 3000);

//   const isAlreadyBooked = !!state.bookedSeats[seatId];
//   if (isAlreadyBooked) {
//     return res.status(400).json({
//       message: "This seat has already been booked!",
//     });
//   }

//   if (!creditCard || !expiration) {
//     return res.status(400).json({
//       status: 400,
//       message: "Please provide credit card information!",
//     });
//   }

//   if (lastBookingAttemptSucceeded) {
//     lastBookingAttemptSucceeded = !lastBookingAttemptSucceeded;

//     return res.status(500).json({
//       message: "An unknown error has occurred. Please try your request again.",
//     });
//   }

//   lastBookingAttemptSucceeded = !lastBookingAttemptSucceeded;

//   state.bookedSeats[seatId] = true;

//   return res.status(200).json({
//     status: 200,
//     success: true,
//   });
// });

module.exports = router;
