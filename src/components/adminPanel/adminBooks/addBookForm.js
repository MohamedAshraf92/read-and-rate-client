import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import Upload from "antd/lib/upload";
import Button from "antd/lib/button";
import { addBook } from "../../../store/actions/booksActions";

const AddBookForm = ({ closeAddBookModal }) => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [fileList, setFileList] = useState([]);

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

  const onSubmit = (data) => {
    let formData = new FormData();
    console.log(typeof data.description);

    formData.append("name", data.name);
    formData.append("description", data.description);
    for (let i = 0; i < data.authors.length; i++) {
      formData.append("authors[]", data.authors[i]);
    }
    for (let i = 0; i < data.categories.length; i++) {
      formData.append("categories[]", data.categories[i]);
    }
    formData.append("photo", Array.from(fileList)[0]);

    const callback = () => {
      setFileList([]);
      closeAddBookModal(false);
      reset({
        name: "",
        description: "",
        authors: [],
        categories: [],
        photo: [],
      });
    };

    dispatch(addBook(formData, callback));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-element-full">
        <label>Book name</label>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
        {errors.name && <p className="form-err">Book name is required</p>}
      </div>
      <div className="form-element-full">
        <label>Book Description</label>
        <Controller
          control={control}
          name="description"
          type="text"
          rules={{ required: true }}
          render={({ field }) => <textarea {...field} className="ant-input" />}
        />
        {errors.description && (
          <p className="form-err">Book name is required</p>
        )}
      </div>
      <div className="form-element-full">
        <label>Authors</label>
        <Controller
          control={control}
          name="authors"
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
            >
              {renderAuthors()}
            </Select>
          )}
        />
        {errors.authors && <p className="form-err">Select at least 1 author</p>}
      </div>
      <div className="form-element-full">
        <label>Categories</label>
        <Controller
          control={control}
          name="categories"
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
            >
              {renderCategories()}
            </Select>
          )}
        />
        {errors.categories && (
          <p className="form-err">Select at least 1 category</p>
        )}
      </div>
      <div className="form-element-full">
        <Controller
          control={control}
          name="photo"
          rules={{ required: true }}
          render={({ field }) => (
            <Upload
              defaultValue={[]}
              {...field}
              {...props}
              className="upload-input"
            >
              <Button className="btnMainOut">Select Book Cover</Button>
            </Upload>
          )}
        />
        {errors.photo && <p className="form-err">Book cover is required</p>}
      </div>
      <button type="submit" className="ant-btn btnMain ant-btn-round">
        ADD BOOK
      </button>
    </form>
  );
};

export default AddBookForm;
