const initialState = {
  token: "",
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
