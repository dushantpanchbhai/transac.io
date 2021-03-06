const mongoose = require("mongoose");

const TransacSchema = new mongoose.Schema(
  {
    transacName: String,
    transacType: String,
    amount: Number,
    balance: Number,
  },
  {timestamps: true},
);

const BookSchema = new mongoose.Schema(
  {
    bookName: String,
    balance: Number,
    tag: String,
    previous: Boolean,
    transactions: [TransacSchema],
  },
  { timestamps: true }
);

const Schema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  books: [BookSchema],
});



Schema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword == this.password;
};

module.exports = new mongoose.model("TransacUser",Schema);