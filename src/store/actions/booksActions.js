import API from "../../API";
import message from "antd/lib/message";

export const getBooks = () => (dispatch) => {
  API.get("/book")
    .then((res) => {
      dispatch({
        type: "GET_BOOKS",
        books: res.data,
      });
    })
    .catch((err) => {
      message.error(err.response.data.message);
    });
};

export const addBook = (data, callBack) => (dispatch) => {
  API({
    method: "post",
    url: "/book",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("state")).auth.token
      }`,
    },
    data,
  })
    .then((res) => {
      dispatch(getBooks());
      message.success("Book added successfully");
      callBack && callBack();
    })
    .catch((err) => {
      message.error(err.response.data.message);
    });
};

export const editBook = (data, callBack) => (dispatch) => {
  API({
    method: "patch",
    url: "/book",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("state")).auth.token
      }`,
    },
    data,
  })
    .then((res) => {
      dispatch(getBooks());
      message.success("Book edited successfully");
      callBack && callBack();
    })
    .catch((err) => {
      message.error(err.response.data.message);
    });
};

export const deleteBook = (data, callBack) => (dispatch) => {
  API({
    method: "delete",
    url: "/book",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("state")).auth.token
      }`,
    },
    data,
  })
    .then((res) => {
      dispatch(getBooks());
      message.success("Book deleted successfully");
      callBack && callBack();
    })
    .catch((err) => {
      message.error(err.response.data.message);
    });
};
