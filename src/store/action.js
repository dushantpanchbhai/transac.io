import axios from "../axios.js";

export const addBook = (content) => {
  console.log("adding to form");
  return {
    type: "AddBook",
    payload: content,
  };
};

export const UpdateBook = (data) => {
  console.log("updating book");
  return {
    type: "UpdateBook",
    payload: data,
  };
};

export const AddUser = (data) => {
  console.log("adding user to reducer");
  return {
    type: "AddUser",
    payload: data,
  };
};

export const DeleteBook = (data) => {
  console.log("deleting book");
  return {
    type: "DeleteBook",
    payload: data,
  };
};
