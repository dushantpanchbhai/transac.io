require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./authRoutes.js");
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
    "mongodb+srv://admin:dushant1234@cluster0.odxqa.mongodb.net/transac_data?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
//importing schemas;
const BookSchema = require("./BookSchema.js");
const UserSchema = require("./UserSchema.js");

app.get("/", (req, res) => {
  res.send({ title: "Transac.io", connected: true });
});

//login
app.use("/api/auth", routes);
//sign up page handle
app.use("/api", routes);
app.use(errorHandler);

//posting data from input to create transac book
app.post("/api/create/:id", async (req, res) => {
  console.log("creating a new transac book");
  const userId = req.params.id;
  const UploadData = {
    bookName: req.body.bookName,
    balance: req.body.balance,
    tag: req.body.tag,
    previous: req.body.previous,
  };
  await UserSchema.findOneAndUpdate(
    { _id: userId },
    {
      $push: { books: UploadData },
    }
  ).catch((err) => {
    console.log(err);
  });
  //fetching book data;
  const data = await UserSchema.findOne({ _id: userId });

  // console.log(data);
  res.status(201).send(data);
});

//getting totoal books created
app.get("/api/transacBook/:id", async (req, res) => {
  console.log("fetching transac book");
  const id = req.params.id;
  if (id == "undefined") {
    console.log("thowed error");
    res.status(400).send({"error" : "Login Error! plese revisit webpage"});
  } else {
    const { books } = await UserSchema.findOne({ _id: id });
    if (books) {
      res.status(201).send(books);
    } else {
      res.status(400).send({"error" : "Error Fetching Data, Check your Internet"});
    }
  }
});

//deleting book
app.delete("/api/transac/delete/:userId/:bookId", async (req, res) => {
  console.log("deleting a book");
  const { userId, bookId } = req.params;
  await UserSchema.updateOne(
    { _id: userId },
    {
      $pull: { books: { _id: bookId } },
    }
  ).catch((err) => {
    console.log(err);
    res.status(400).send();
  });

  let data;
  await UserSchema.findOne({ _id: userId })
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(data.books);
});

app.listen(port, () => {
  console.log("serving at port 8000");
});
