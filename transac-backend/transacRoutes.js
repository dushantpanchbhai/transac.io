const express = require("express");
const asyncHandler = require("express-async-handler");
const { bookSchema, transacSchema } = require("./TransacSchema");
const router = express.Router();

const addTransaction = asyncHandler(async (req, res) => {
  console.log("adding_transaction");
  const userId = req.params.id;
  var {transacName,category,amount,type,date} = req.body;

  //getting book data with given user id
  let data = await bookSchema
    .findOne({ user_id: userId, tag: category })
    .catch((err) => {
      console.log(err);
    });


  let data2 = await bookSchema.find({user_id : userId}).catch((err)=>{console.log(err)});
  var totalBalance = 0;
  data2.map((items)=>{totalBalance += items.balance});
  
  amount = parseInt(amount);
  var remainBalance = 0;
  if (type == "Debit") {
    remainBalance = data.balance - amount;
    totalBalance = totalBalance - amount;
  } else {
    remainBalance = data.balance + amount;
    totalBalance = totalBalance + amount;
  }
  
  //book id refrence for pushing it into the trnasac book
  let bookId = data._id;

  //transac book data
  const push_data = {
    book_id: bookId,
    transacName: transacName,
    transacType: type,
    category: category,
    amount: amount,
    balance: remainBalance,
    totalBalance : totalBalance,
    date: date,
  };
  console.log(push_data);

  //pushing data in transac book
  await transacSchema
    .create(push_data)
    .then(async (response) => {
      //updating book schema transaction_id section with new response id;
      await bookSchema.findOneAndUpdate(
        { user_id: userId, tag: category },
        {
          $push: { transactions_id: response._id },
          balance: remainBalance,
        }
      );
      res.status(201).send(response);
    })
    .catch((err) => console.log(err));
});

router.route("/new/:id").post(addTransaction);
module.exports = router;