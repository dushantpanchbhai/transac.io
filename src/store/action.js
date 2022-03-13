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

export const login = (data) => {
  console.log('logging in');
  return{
    type : "Login",
    payload : data,
  }
};

export const logout = () => {
  console.log("logging out");
  return{
    type : "Logout"
  }
}

export const DeleteBook = (data) => {
  console.log("deleting book");
  return {
    type: "DeleteBook",
    payload: data,
  };
};
