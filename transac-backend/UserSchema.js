const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const BookSchema = new mongoose.Schema(
  {
    bookName: String,
    balance: Number,
    tag: String,
    previous: Boolean,
  },
  { timestamps: true }
);

const Schema = new mongoose.Schema({
  username: { type: String,required: true,unique: false},
  email: { type: String,required: true,unique: true},
  password: { type: String,required: true,unique: false},
  books: [BookSchema],
});

// Schema.pre("save",async function(next) {
//         if(!this.isModified("password")){
//             next();
//         }

//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password,salt);
// })

Schema.methods.matchPassword = async function(enteredPassword) {
    return enteredPassword == this.password;
}

module.exports = new mongoose.model("TransacUser", Schema);
