const initialState = {
  user: [],
  //stored books;
  accounts: [],
  books: [],
  transactions: [],
  balance: 0,
  isLogged: false,
};

const reducer = (state = initialState, action) => {
  console.log("reducer called");
  switch (action.type) {
    case "AddBook":
      return { ...state, accounts: action.payload };
    case "UpdateBook":
      return { ...state, accounts: action.payload };
    case "DeleteBook":
      return { ...state, accounts: action.payload };
    case "Login":
      return { ...state, user: action.payload, isLogged: true };
    case "Logout":
      return { ...state, isLogged: false, user: [] };
    case "AddUser":
      return { ...state, user: action.payload, isLogged: true, accounts: [] };
    case "AddTransac":
      return { ...state, transactions: action.payload };
    case "AddBalance":
      return { ...state, balance: action.payload };
    case "AddBookData":
      return { ...state, books: action.payload };
    default:
      return state;
  }
};
export default reducer;
