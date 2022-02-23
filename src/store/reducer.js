const initialState = {
  user: [],
  accounts: [],
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
    case "AddUser":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export default reducer;
