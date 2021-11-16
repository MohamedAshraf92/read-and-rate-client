const initialState = {
  authors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_AUTHORS":
      return {
        ...state,
        authors: action.authors,
      };

    default:
      return state;
  }
};

export default reducer;
