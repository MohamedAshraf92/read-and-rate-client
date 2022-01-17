import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "antd/lib/table";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { MdAddCircle } from "react-icons/md";
import message from "antd/lib/message";
import Popconfirm from "antd/lib/popconfirm";
import { getAuthors } from "../../store/actions/authorsAction";
import { getCategories } from "../../store/actions/categoriesActions";
import { getBooks, deleteBook } from "../../store/actions/booksActions";
import Avatar from "antd/lib/avatar";

import AddBookForm from "./addBookForm";
import EditBookForm from "./editBookForm";

import "./adminBooks.css";

const AdminBooks = () => {
  const books = useSelector((state) => state.books.books);

  const [selectedBook, setSelectedBook] = useState({});
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getAuthors());
    dispatch(getCategories());
    // eslint-disable-next-line
  }, []);

  const closeAddBookModal = (value) => setShow(value);
  const closeEditBookModal = (value) => setShowEdit(value);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "25%",
    },
    {
      title: "Book",
      dataIndex: "name",
      width: "40%",
      render: (text, record, index) => {
        return (
          <div className="avatar-badge">
            <Avatar
              className="admin-author-padge"
              src={`http://localhost:8080/${record.photo}`}
              shape="square"
              alt="author image"
            />
            <span>{record.name}</span>
          </div>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "35%",
      render: (text, record, index) => {
        return (
          <div>
            <Button
              className="btnWarn"
              onClick={() => {
                setSelectedBook(record);
                setShowEdit(true);
              }}
            >
              Edit
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Popconfirm
              title="Are you sure to delete this categorey ?"
              onConfirm={() => dispatch(deleteBook({ id: record._id }))}
              onCancel={() => message.info("You cancelled deleting the book")}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button
                className="btnRed"
                onClick={() => {
                  setSelectedBook(record);
                }}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="admin-comp-head">
        <span>
          <h2>Books</h2>
          <h4>Control all Books in our library</h4>
        </span>
        <Button
          className="btnMain btnFlex"
          shape="round"
          icon={<MdAddCircle className="add-icon" />}
          onClick={() => setShow(true)}
        >
          &nbsp;Add Book
        </Button>
      </div>
      <div className="admin-table">
        <Table
          columns={columns}
          dataSource={books}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
          scroll={{ y: 230 }}
        />
      </div>
      <Modal
        title="Add New Book"
        visible={show}
        onCancel={() => setShow(false)}
        footer={null}
      >
        <AddBookForm closeAddBookModal={closeAddBookModal} />
      </Modal>

      <Modal
        title="Edit Author"
        visible={showEdit}
        onCancel={() => setShowEdit(false)}
        footer={null}
      >
        <EditBookForm
          closeEditBookModal={closeEditBookModal}
          selectedBook={selectedBook}
        />
      </Modal>
    </div>
  );
};

export default AdminBooks;
