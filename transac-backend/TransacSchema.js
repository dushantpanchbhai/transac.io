const mongoose = require("mongoose");

const TransacSchema = new mongoose.Schema(
  {
    book_id: Object,
    transacName: String,
    transacType: String,
    category : String,
    amount: Number,
    balance: Number,
    date : Date,
  },
  {timestamps: true},
);

const BookSchema = new mongoose.Schema(
  {
    bookName: String,
    balance: Number,
    tag: String,
    user_id: String,
    transactions_id: [String],
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  books_id: [String],
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword == this.password;
};

const userSchema = new mongoose.model("UserSchema",UserSchema);
const bookSchema = new mongoose.model("BookSchema",BookSchema);
const transacSchema = new mongoose.model("TranacSchema",TransacSchema);

module.exports = {userSchema,bookSchema,transacSchema};