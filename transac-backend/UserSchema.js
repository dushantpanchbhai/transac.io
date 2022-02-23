const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    bookName : String,
    balance : Number,
    tag : String,
    previous : Boolean,
});

const Schema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    books : [BookSchema],
});

module.exports = new mongoose.model("TransacUser",Schema)