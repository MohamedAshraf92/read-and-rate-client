import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "antd/lib/table";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { MdAddCircle } from "react-icons/md";
import message from "antd/lib/message";
import Input from "antd/lib/input";
import Space from "antd/lib/space";
import Popconfirm from "antd/lib/popconfirm";
import API from "../../API";
import { getAuthors } from "../../store/actions/authorsAction";
import Avatar from "antd/lib/avatar";
import ImgCrop from "antd-img-crop";
import Upload from "antd/lib/upload";

import "./adminAuthors.css";

const AdminAuthors = () => {
  const authors = useSelector((state) => state.authors.authors);
  const token = useSelector((state) => state.auth.token);

  const [selectedAuthor, setSelectedAuthor] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [fileList, setFileList] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthors());
    // eslint-disable-next-line
  }, []);

  const addAuthor = () => {
    let formData = new FormData();
    if (firstName === "") message.warn("First Name is required");
    if (lastName === "") message.warn("Last Name is required");
    if (birthday === "") message.warn("Birthday is required");
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthday", birthday);
    formData.append("photo", Array.from(fileList)[0]);

    API({
      method: "post",
      url: "/author",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    })
      .then((res) => {
        dispatch(getAuthors());
        setShow(false);
        message.success("Author added seccessfully!");
        setFirstName("");
        setLastName("");
        setBirthday("");
        setFileList([]);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const editCategory = () => {
    API({
      method: "patch",
      url: "/category",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // data: { categoryId: selectedAuthor._id, newName: name },
    })
      .then((res) => {
        dispatch(getAuthors());
        setShowEdit(false);
        message.success("Category edited seccessfully!");
        // setName("");
      })
      .catch((err) => {
        console.log(err.response);
        message.error(err.response.data.message);
      });
  };

  const deleteCategory = () => {
    API({
      method: "delete",
      url: "/category",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // data: { id: selectedCategory._id },
    })
      .then((res) => {
        dispatch(getAuthors());
        setShowEdit(false);
        message.success("Category deleted seccessfully!");
        // setName("");
      })
      .catch((err) => {
        console.log(err.response);
        message.error(err.response.data.message);
      });
  };

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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "25%",
    },
    {
      title: "Author",
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
            <span>
              {record.firstName} {record.lastName}
            </span>
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
                setSelectedAuthor(record);
                setShowEdit(true);
              }}
            >
              Edit
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Popconfirm
              title="Are you sure to delete this categorey ?"
              onConfirm={deleteCategory}
              onCancel={() =>
                message.info("You cancelled deleting the categorey")
              }
              okText="Delete"
              cancelText="Cancel"
            >
              <Button
                className="btnRed"
                onClick={() => {
                  setSelectedAuthor(record);
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
          <h2>Authors</h2>
          <h4>Control all authors information, and add new authors</h4>
        </span>
        <Button
          className="btnMain btnFlex"
          shape="round"
          icon={<MdAddCircle className="add-icon" />}
          onClick={() => setShow(true)}
        >
          &nbsp;Add Author
        </Button>
      </div>
      <div className="admin-table">
        <Table
          columns={columns}
          dataSource={authors}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
          scroll={{ y: 230 }}
        />
      </div>
      <Modal
        title="Add New Author"
        visible={show}
        onCancel={() => setShow(false)}
        footer={[
          <Button
            className="btnMain"
            style={{ marginLeft: "0px" }}
            onClick={addAuthor}
          >
            Add
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            addonBefore="First Name"
            placeholder="Author first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            addonBefore="Last Name"
            placeholder="Author last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            addonBefore="Birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <ImgCrop>
            <Upload {...props} className="upload-input">
              <Button className="btnMainOut">Select Photo</Button>
            </Upload>
          </ImgCrop>
        </Space>
      </Modal>

      <Modal
        title="Edit Category"
        visible={showEdit}
        onCancel={() => setShowEdit(false)}
        footer={[
          <Button
            className="btnMain"
            style={{ marginLeft: "0px" }}
            onClick={editCategory}
          >
            Edit
          </Button>,
        ]}
      >
        <p>Edited category name :</p>
        <Input
          type="text"
          placeholder="Sports, History, etc.."
          defaultValue={selectedAuthor.name}
          // onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AdminAuthors;
