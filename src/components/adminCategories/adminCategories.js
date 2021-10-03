import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "antd/lib/table";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { MdAddCircle } from "react-icons/md";
import message from "antd/lib/message";
import Input from "antd/lib/input";
import Popconfirm from "antd/lib/popconfirm";
import API from "../../API";
import { getCategories } from "../../store/actions/categoriesActions";

import "./adminCategories.css";

const AdminCategories = () => {
  const categories = useSelector((state) => state.categories.categories);
  const token = useSelector((state) => state.auth.token);

  const [selectedCategory, setSelectedCategorey] = useState([]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line
  }, []);

  const addCategory = () => {
    API({
      method: "post",
      url: "/category",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name },
    })
      .then((res) => {
        dispatch(getCategories(res.data));
        setShow(false);
        message.success("Category added seccessfully!");
        setName("");
      })
      .catch((err) => {
        console.log(err.response);
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
      data: { categoryId: selectedCategory._id, newName: name },
    })
      .then((res) => {
        dispatch(getCategories(res.data));
        setShowEdit(false);
        message.success("Category edited seccessfully!");
        setName("");
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
      data: { id: selectedCategory._id },
    })
      .then((res) => {
        dispatch(getCategories(res.data));
        setShowEdit(false);
        message.success("Category deleted seccessfully!");
        setName("");
      })
      .catch((err) => {
        console.log(err.response);
        message.error(err.response.data.message);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "25%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "40%",
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
                setSelectedCategorey(record);
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
                  setSelectedCategorey(record);
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
          <h2>Categories</h2>
          <h4>You can add, edit or delete any category</h4>
        </span>
        <Button
          className="btnMain btnFlex"
          shape="round"
          icon={<MdAddCircle className="add-icon" />}
          onClick={() => setShow(true)}
        >
          &nbsp;Add Category
        </Button>
      </div>
      <div className="admin-table">
        <Table
          columns={columns}
          dataSource={categories}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
          scroll={{ y: 230 }}
        />
      </div>
      <Modal
        title="Add Category"
        visible={show}
        onCancel={() => setShow(false)}
        footer={[
          <Button
            className="btnMain"
            style={{ marginLeft: "0px" }}
            onClick={addCategory}
          >
            Add
          </Button>,
        ]}
      >
        <p>New category name :</p>
        <Input
          type="text"
          placeholder="Sports, History, etc.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          defaultValue={selectedCategory.name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AdminCategories;
