const initialState = {
  categories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };

    default:
      return state;
  }
};

export default reducer;
