export const loginUser = (res) => {
  return {
    type: "LOGIN",
    token: res.token,
    user: res.user,
  };
};
