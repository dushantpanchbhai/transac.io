const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    bookName : String,
    balance : Number,
    tag : String,
    previous : Boolean,
});

module.exports = new mongoose.model("transacBook",Schema)