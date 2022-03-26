const express = require("express");
const asyncHandler = require("express-async-handler");
const { bookSchema, transacSchema } = require("./TransacSchema");
const router = express.Router();

//fetch tag of books
const fetchTag = asyncHandler(async (req,res) => {
    console.log("fetching tag");
    const userId = req.params.id;
    const data = await bookSchema.find({userId : userId},{tag : 1, _id : 0});
    res.status(201).send(data);
})

//fetch all books with title data 
const fetchBookTitles = asyncHandler(async(req,res)=> {
    console.log("fetching all books title")
    const userId = req.params.id;
    try
    {
        const data = await bookSchema.find({userId : userId},{bookName : 1,balance : 1,tag : 1,transacions_id : 1});
        res.status(201).send(data);
    }
    catch
    {
        res.status(401).send(data);
    }
})

//fetch all the transaction belonging to main book
const fetchMainBook = asyncHandler(async (req,res) => {
    console.log("fetching main data");
    const userId = req.params.id;
    try
    {
        const data = await bookSchema.find({userId: userId},{transactions_id : 1,_id : 0});
        //pushing all transaction id in id List
        let idList = [];
        data.map((item) =>{item.transactions_id.map((d)=>idList.push(d))});
        //geting all transactions using id list tag;
        const transacs = await transacSchema.find({_id : {$in : idList}});
        res.status(201).send(transacs);
    }
    catch
    {
        res.status(400).send("some error occured");
    }
})

//fetch total balance (get request)
const fetchBalance = asyncHandler(async(req,res) => {
    console.log("fetching total balance");
    const userId = req.params.id;
    try
    {
        const data = await bookSchema.find({user_id : userId},{balance : 1,_id : 0});
        var totalBalance = 0;
        data.map((items)=> totalBalance+=items.balance);
        res.status(201).send({totalBalance});
    }
    catch
    {
        res.status(401).send("unable to fetch balance");
    }
})

router.route("/fetchtag/:id").get(fetchTag);
router.route("/fetchMain/:id").get(fetchMainBook);
router.route("/fetchBalance/:id").get(fetchBalance);
router.route("/fetchBook/:id").get(fetchBookTitles);

module.exports = router;
