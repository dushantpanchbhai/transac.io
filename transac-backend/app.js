require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./authRoutes.js");
const routes2 = require("./transacRoutes.js");
const routes3 = require("./BookFetchRoutes.js");
const errorHandler = require("./errorMiddleware.js");

var port = 8000; //port
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//mongodb+srv://admin:<password>@cluster0.odxqa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose
  .connect(
    "mongodb+srv://admin:dushant1234@cluster0.odxqa.mongodb.net/transac_data?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
//importing schemas;
const { userSchema, bookSchema, transacSchema } = require("./TransacSchema.js");
const { response } = require("express");

app.get("/", (req, res) => {
  res.send({ title: "Transac.io", connected: true });
});

//login
app.use("/api/auth", routes);
//sign up page handle
app.use("/api", routes);
app.use(errorHandler);

//new transaction handler
app.use("/api", routes2);

//fetch booktag
app.use("/api",routes3);

//posting data from input to create transac book
app.post("/api/create/:id", async (req, res) => {
  console.log("creating a new transac book");
  const userId = req.params.id;
  //uploading parameters
  const UploadData = {
    bookName: req.body.bookName,
    balance: req.body.balance,
    tag: req.body.tag,
    user_id: userId,
  };

  //adding to bookschema and storing id in book_id of userSchema
  await bookSchema
    .create(UploadData)
    .then(async (response) => {
      await userSchema
        .findOneAndUpdate(
          { _id: userId },
          {
            $push: { books_id: response._id },
          }
        )
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });

  //getting book schema data;
  const data = await bookSchema.find({ user_id: userId });
  //sending book schema;
  res.status(201).send(data);
});

//getting totoal books created
app.get("/api/transacBook/:id", async (req, res) => {
  console.log("fetching transac book");
  const id = req.params.id;
  if (id == "undefined") {
    console.log("thowed error");
    res.status(400).send({ error: "Login Error! plese revisit webpage" });
  } else {
    const books = await bookSchema.find({ user_id: id });
    if (books) {
      res.status(201).send(books);
    } else {
      res
        .status(400)
        .send({ error: "Error Fetching Data, Check your Internet" });
    }
  }
});

//deleting book
app.delete("/api/transac/delete/:userId/:bookId", async (req, res) => {
  console.log("deleting a book");
  const { userId, bookId } = req.params;
  console.log(userId, bookId);

  //deleting book;
  await bookSchema.deleteOne({ _id: bookId }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });

  //deleting book id from user schema
  await userSchema
    .findOneAndUpdate({ _id: userId }, { $pull: { books_id: bookId } })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  const data = await bookSchema.find({ user_id: userId });
  res.status(201).send(data);
});

app.listen(port, () => {
  console.log("serving at port 8000");
});
