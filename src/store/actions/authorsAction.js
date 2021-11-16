import API from "../../API";
import message from "antd/lib/message";

export const getAuthors = () => (dispatch) => {
  API.get("/author")
    .then((res) => {
      dispatch({
        type: "GET_AUTHORS",
        authors: res.data,
      });
    })
    .catch((err) => {
      message.error("Failed loading authors!");
    });
};
