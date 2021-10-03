import API from "../../API";
import message from "antd/lib/message";

export const getCategories = () => (dispatch) => {
  API.get("/category")
    .then((res) => {
      dispatch({
        type: "GET_CATEGORIES",
        categories: res.data,
      });
    })
    .catch((err) => {
      message.error("Failed loading categories!");
    });
};
