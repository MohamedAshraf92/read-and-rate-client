const initialState = {
  token: "",
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      // localStorage.setItem("token", action.token);
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
