const initialState = {
  books: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        books: action.books,
      };

    default:
      return state;
  }
};

export default reducer;
