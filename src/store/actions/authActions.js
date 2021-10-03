export const loginUser = (res) => {
  console.log("logged in");
  return {
    type: "LOGIN",
    token: res.token,
    user: res.user,
  };
};
