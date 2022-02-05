import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import Upload from "antd/lib/upload";
import Button from "antd/lib/button";
import Avatar from "antd/lib/avatar";
import { editBook } from "../../store/actions/booksActions";

import bookIcon from "../../assets/book.png";

const EditBookForm = ({ selectedBook, closeEditBookModal }) => {
  const [bookName, setBookName] = useState("");
  const [description, setDesscription] = useState("");
  const [BookAuthors, setBookAuthors] = useState([]);
  const [bookCategories, setBookCategories] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    setBookName(selectedBook.name);
    setDesscription(selectedBook.description);
    setBookAuthors(selectedBook.authors);
    setBookCategories(selectedBook.categories);
  }, [selectedBook]);

  const dispatch = useDispatch();

  const authors = useSelector((state) => state.authors.authors);
  const categories = useSelector((state) => state.categories.categories);

  const { Option } = Select;

  const renderAuthors = () =>
    authors.map((author) => {
      return (
        <Option value={author._id} key={author._id}>
          {author.firstName}&nbsp;{author.lastName}
        </Option>
      );
    });

  const renderCategories = () =>
    categories.map((cat) => {
      return (
        <Option value={cat._id} key={cat._id}>
          {cat.name}
        </Option>
      );
    });

  const props = {
    onRemove: (file) => {
      this.setState(() => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const editBookHandler = () => {
    let formData = new FormData();

    formData.append("name", bookName);
    formData.append("description", description);
    for (let i = 0; i < BookAuthors.length; i++) {
      formData.append("authors[]", BookAuthors[i]);
    }
    for (let i = 0; i < bookCategories.length; i++) {
      formData.append("categories[]", bookCategories[i]);
    }
    formData.append("photo", Array.from(fileList)[0]);
    formData.append("bookId", selectedBook._id);

    const callback = () => {
      setFileList([]);
      closeEditBookModal(false);
    };

    dispatch(editBook(formData, callback));
  };

  return (
    <div>
      <span className="avatar-block">
        <Avatar
          src={
            selectedBook.photo === ""
              ? bookIcon
              : `http://localhost:8080/${selectedBook.photo}`
          }
          size={100}
        />
        <Upload {...props} className="upload-input">
          <Button className="btnMainOut">Change Photo</Button>
        </Upload>
      </span>
      <div className="form-element-full">
        <label>Book name</label>
        <Input value={bookName} onChange={(e) => setBookName(e.target.value)} />
      </div>
      <div className="form-element-full">
        <label>Book description</label>
        <textarea
          type="text"
          className="ant-input"
          value={description}
          onChange={(e) => setDesscription(e.target.value)}
        />
      </div>
      <div className="form-element-full">
        <label>Authors</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          value={BookAuthors}
          onChange={(e) => setBookAuthors(e.target.value)}
        >
          {renderAuthors()}
        </Select>
      </div>
      <div className="form-element-full">
        <label>Categories</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          value={bookCategories}
          onChange={(e) => setBookCategories(e.target.value)}
        >
          {renderCategories()}
        </Select>
      </div>
      <button
        onClick={editBookHandler}
        className="ant-btn btnMain ant-btn-round"
      >
        EDIT BOOK
      </button>
    </div>
  );
};

export default EditBookForm;
