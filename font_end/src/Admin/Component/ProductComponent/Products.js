import {
  Button,
  Flex,
  Modal,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Upload,
  message,
  Space,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TableProductsComponent from "../TableComponent/TableProductsComponent";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import TextArea from "antd/es/input/TextArea";
import * as ProductServices from "../../../services/ProductService";
import { useMutationHooks } from "../../../hooks/useMutationHooks";
import Loading from "../../../Component/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

import imageCompression from "browser-image-compression";
const Products = () => {
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: [""],
    type: "",
    countInStock: "",
    discount: "",
    color: [""],
  });
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: [""],
    countInStock: "",
    discount: "",
    color: [""],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state?.user);

  const mutation = useMutationHooks(async (data) => {
    const res = await ProductServices.createProduct(data);
    return res;
  });

  const mutationUpdateProduct = useMutationHooks(async (data) => {
    const { id, token, ...rests } = data;
    console.log("rests", rests.dataUpdated);
    const res = await ProductServices.updateProduct(
      id,
      token,
      rests.dataUpdated
    );
    console.log("resadsadssad", res);
    return res;
  });
  const mutationDeleted = useMutationHooks(async (data) => {
    const { id, token } = data;

    const res = await ProductServices.deleteProduct(id, token);

    return res;
  });
  const mutationManyDeleted = useMutationHooks(async (data) => {
    const { token, ...rests } = data;

    const res = await ProductServices.deleteManyProduct(rests ,token);

    return res;
  });

  console.log("mutationManyDeleted",mutationManyDeleted)

  const { data, isLoading, isError, isSuccess } = mutation;

  const {
    data: dataUpdated,
    isError: isErrorUpdated,
    isSuccess: isSuccessUpdated,
  } = mutationUpdateProduct;

  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isError: isErrorDeleted,
    isSuccess: isSuccessDeleted,
  } = mutationDeleted;


  const {
    data: dataDeletedMany,
    isError: isErrorDeletedMany,
    isSuccess: isSuccessDeletedMany,
  } = mutationManyDeleted;


  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      discount: "",
      image: "",
      type: "",
      countInStock: "",
      color: "",
    });
  };
  //thông báo khi tạo xong sản phẩm
  useEffect(() => {
    if (isSuccess && data?.status == "Ok") {
      message.success("Tạo sản phầm thành công");
      handleCancel();
    } else if (isError) {
      message.error("Xảy ra lỗi vui lòng kiểm tra lại.");
    }
  }, [isSuccess, isError]);

  //thông báo khi tạo xong sản phẩm

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status == "Ok") {
      message.success("Cập nhập sản phầm thành công");
      setIsOpenDrawer(false);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      handleCancel();
    } else if (isErrorUpdated) {
      message.error("Xảy ra lỗi vui lòng kiểm tra lại.");
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status == "Ok") {
      message.success("Xóa sản phầm thành công");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error("Xảy ra lỗi vui lòng kiểm tra lại.");
    }
  }, [isSuccessDeleted, isErrorDeleted]);


  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status == "Ok") {
      message.success("Xóa các sản phầm thành công");
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 2000);

    } else if (isErrorDeletedMany) {
      message.error("Xảy ra lỗi vui lòng kiểm tra lại.");
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  //
  const fetchGetProductsDetail = async () => {
    const res = await ProductServices.getDetailsProduct(rowSelected);

    const dataProduct = res?.data[0];
    if (res?.data) {
      setStateProductDetail({
        name: dataProduct?.name,
        price: dataProduct?.price,
        discount: dataProduct?.discount,
        description: dataProduct?.description,
        rating: dataProduct?.rating,
        image: dataProduct?.image,
        type: dataProduct?.type,
        countInStock: dataProduct?.countInStock,
        color: dataProduct?.color,
      });
    }

    return res;
  };
  useEffect(() => {
    if (rowSelected) {
      fetchGetProductsDetail();
    }
  }, [rowSelected]);
  console.log("rowSelected", rowSelected);
  const handleDetailsProduct = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (rowSelected) {
      fetchGetProductsDetail(rowSelected);
    }
    setIsOpenDrawer(true);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: stateProductDetail.name,
      price: stateProductDetail.price,
      description: stateProductDetail.description,
      discount: stateProductDetail.discount,
      rating: stateProductDetail.rating,
      countInStock: stateProductDetail.countInStock,
      color: stateProductDetail.color,
      type: stateProductDetail.type,
    });
  }, [form, stateProductDetail]);

  const getAllProducts = async () => {
    const res = await ProductServices.getAllProduct();
    return res;
  };
  const queryProduct = useQuery(["products"], getAllProducts, {
    retry: 3,
    retryDelay: 1000,
  });
  const { isLoading: isLoadingProduct, data: products } = queryProduct;
  // Hàm xử lý sự thay đổi giá trị chung cho các input
  const handleChange = (e) => {
    const { name, value } = e.target || {}; // Kiểm tra nếu e.target tồn tại
    setStateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeDetail = (e) => {
    const { name, value } = e.target || {}; // Kiểm tra nếu e.target tồn tại
    setStateProductDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const renderAction = () => {
    return (
      <div>
        <FaRegEdit
          className="ant-btn"
          style={{ fontSize: "26px", margin: "5px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
        <MdDeleteOutline
          className="ant-btn"
          style={{ fontSize: "26px", margin: "5px", cursor: "pointer" }}
          onClick={onOpenModalDelete}
        />
      </div>
    );
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90, marginLeft: 8 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ padding: 0 }}>{text.toString()}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        { text: "0 - 100", value: [0, 100] },
        { text: "100 - 200", value: [100, 200] },
        { text: "200+", value: [200, Infinity] },
      ],
      onFilter: (value, record) =>
        record.price >= value[0] && record.price < value[1],
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={`data:image/png;base64,${image}`}
          alt="Product Image"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
      ],
      onFilter: (value, record) => record.rating === value,
    },
    {
      title: "CountInStock",
      dataIndex: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock,
      filters: [
        { text: "Low Stock (0 - 50)", value: [0, 50] },
        { text: "Medium Stock (50 - 100)", value: [50, 100] },
        { text: "High Stock (100+)", value: [100, Infinity] },
      ],
      onFilter: (value, record) =>
        record.countInStock >= value[0] && record.countInStock < value[1],
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable = products?.data?.map((product) => {
    return {
      ...product,
      key: product._id,
    };
  });

  // Cập nhật trực tiếp giá trị cho các trường không phải là text input
  const handleFieldChange = (fieldName, value) => {
    setStateProduct((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  const handleFieldChangeDetail = (fieldName, value) => {
    setStateProductDetail((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  const handleOnChangeImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        // Options for compression
        const options = {
          maxSizeMB: 0.01, // 10KB
          maxWidthOrHeight: 800, // Resize based on max width/height
          useWebWorker: true,
        };

        // Compress the file
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          setStateProduct({ image: base64String });
        };

        // Convert compressed file to base64 string
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.log("Error compressing the image: ", error);
      }
    } else {
      setStateProduct({ image: null });
    }
  };

  const handleOnChangeImageDetail = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        // Options for compression
        const options = {
          maxSizeMB: 0.01, // 100KB
          maxWidthOrHeight: 800, // Resize based on max width/height
          useWebWorker: true,
        };

        // Compress the file
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          setStateProductDetail({ image: base64String });
        };

        // Convert compressed file to base64 string
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.log("Error compressing the image: ", error);
      }
    } else {
      setStateProductDetail({ image: null });
    }
  };
  // Xử lý submit form
  const onFinish = (values) => {
    const mergedData = { ...values, ...stateProduct };
    mutation.mutate(mergedData, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
    setStateProduct(mergedData);
    console.log("Merged stateProduct:", stateProduct);
    // Ở đây bạn có thể gửi giá trị form đến backend hoặc xử lý dữ liệu khác
  };

  const onFishnisUpdateProduct = (values) => {
    const mergedData = { ...values, ...stateProductDetail };
    console.log("Merged stateProduct Data onFishnisUpdateProduct:", mergedData);
    setStateProductDetail(mergedData);
    onUpdateProduct();
  };
  const onUpdateProduct = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    mutationUpdateProduct.mutate(
      {
        id: rowSelected,
        token: user.access_token,
        dataUpdated: stateProductDetail,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const onOpenModalDelete = () => {
    setIsModalOpenDelete(true);
    setLoadingDelete(true);
    setTimeout(() => {
      setLoadingDelete(false);
    }, 1000);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleDeletedMany = (_id) =>{
    const ids = _id.map(function (item) {
      return item._id})

    mutationManyDeleted.mutate(
      {
        data: ids,
        token: user?.access_token
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  }
  return (
    <>
      <Flex vertical>
        <div>
          <h2>Quản lý sản phẫm</h2>
        </div>
        <div>
          <Button
            style={{ marginBottom: "10px" }}
            onClick={() => setIsModalOpen(true)}
          >
            <IoMdAdd style={{ fontSize: "20px" }} />
          </Button>
        </div>
        <Loading isLoading={loading}>
          <TableProductsComponent
            handleDeletedMany={handleDeletedMany}
            coloums={columns}
            data={dataTable}
            
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id);
                }, // click row
              };
            }}
          />
        </Loading>

        <div style={{ display: "none" }}>
          <Loading isLoading={isLoading}>
            <ModalComponent
              forceRender
              footer={null}
              destroyOnClose
              className="submit-data-product"
              title="Tạo sản phẩm"
              open={isModalOpen}
              onCancel={handleCancel}
            >
              <Form
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
              >
                <Form.Item
                  label="Tên sản phẩm"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product name!",
                    },
                  ]}
                >
                  <Input
                    name="name"
                    value={stateProduct.name}
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Giá bán"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product price!",
                    },
                  ]}
                >
                  <Input
                    min={1}
                    name="price"
                    value={stateProduct.price}
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Giảm giá"
                  name="discount"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product price!",
                    },
                  ]}
                >
                  <Input
                    min={1}
                    name="discount"
                    value={stateProduct.discount}
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Số lượng"
                  name="countInStock"
                  rules={[
                    {
                      required: true,
                      message: "Please input the stock count!",
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    style={{ width: "100%" }}
                    value={stateProduct.countInStock}
                    onChange={(value) =>
                      handleFieldChange("countInStock", value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Đánh giá"
                  name="rating"
                  rules={[
                    {
                      required: true,
                      message: "Please input the stock count!",
                    },
                  ]}
                >
                  <InputNumber
                    max="5"
                    min="0"
                    style={{ width: "100%" }}
                    value={stateProduct.rating}
                    onChange={(value) => handleFieldChange("rating", value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product description!",
                    },
                  ]}
                >
                  <TextArea
                    name="description"
                    value={stateProduct.description}
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Upload"
                  valuePropName="fileList"
                  name="image"
                  rules={[
                    {
                      validator(_, value) {
                        if (
                          stateProduct.image &&
                          stateProduct.image.size > 819200
                        ) {
                          return Promise.reject(
                            new Error("Image must be smaller than 100KB!")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <div className="App">
                    <div className="single-input-item mb-3">
                      <label htmlFor="avatar" className="required mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        id="avatar"
                        placeholder="Avatar"
                        name="image"
                        onChange={handleOnChangeImage}
                      />
                    </div>
                    <div className="image-preview" id="imagePreview">
                      {stateProduct.image ? (
                        <img
                          src={`data:image/png;base64,${stateProduct.image}`}
                          alt="Avatar"
                          style={{ marginBottom: "10px" }}
                        />
                      ) : (
                        <span>No image</span>
                      )}
                    </div>
                  </div>
                </Form.Item>
                <Form.Item
                  label="Màu sắc"
                  name="color"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product color!",
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    value={stateProduct.color}
                    onChange={(value) => handleFieldChange("color", value)}
                    options={[
                      { value: "Xanh dương" },
                      { value: "Hồng" },
                      { value: "Đỏ" },
                      { value: "Trắng" },
                      { value: "Vàng" },
                      { value: "Xanh lá cây" },
                      { value: "Cam" }
                    ]} // Dummy data
                  />
                </Form.Item>
                <Form.Item
                  label="Chủ đề"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Please select the product type!",
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    value={stateProduct.type}
                    onChange={(value) => handleFieldChange("type", value)}
                    options={[
                      { value: "Hoa chức mừng" },
                      { value: "Hoa cưới cầm tay" },
                      { value: "Hoa tình yêu" },
                      { value: "Hoa Valentine" },
                      { value: "Hoa tặng tốt nghiệp" },
                      { value: "Hoa ngày 8-3" },
                      
                      { value: "Trưng bày trong nhà" },
                    ]} // Dummy data
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </ModalComponent>
          </Loading>
        </div>

        {/* Cập nhâp sản phẩm */}

        <DrawerComponent
          title="Chi tiết sản phầm"
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          width="70%"
          isLoadingDrawer={loading}
        >
          <Form
            onFinish={onFishnisUpdateProduct}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input the product name!" },
              ]}
            >
              <Input
                name="name"
                value={stateProductDetail.name}
                onChange={handleChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Giá bán"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input the product price!",
                },
              ]}
            >
              <Input
                name="price"
                value={stateProductDetail.price}
                onChange={handleChangeDetail}
              />
            </Form.Item>
            

            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input the product discount!",
                },
              ]}
            >
              <Input
                name="discount"
                value={stateProductDetail.discount}
                onChange={handleChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="countInStock"
              rules={[
                { required: true, message: "Please input the stock count!" },
              ]}
            >
              <InputNumber
                min="0"
                style={{ width: "100%" }}
                value={stateProductDetail.countInStock}
                onChange={(value) =>
                  handleFieldChangeDetail("countInStock", value)
                }
              />
            </Form.Item>

            <Form.Item
              label="Đánh giá"
              name="rating"
              rules={[
                { required: true, message: "Please input the stock count!" },
              ]}
            >
              <InputNumber
                max="5"
                min="0"
                style={{ width: "100%" }}
                value={stateProductDetail.rating}
                onChange={(value) => handleFieldChangeDetail("rating", value)}
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input the product description!",
                },
              ]}
            >
              <TextArea
                name="description"
                value={stateProductDetail.description}
                onChange={handleChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Upload"
              valuePropName="fileList"
              name="image"
              rules={[
                {
                  validator(_, value) {
                    if (
                      stateProduct.image &&
                      stateProduct.image.size > 819200
                    ) {
                      return Promise.reject(
                        new Error("Image must be smaller than 100KB!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="App">
                <div className="single-input-item mb-3">
                  <label htmlFor="avatar" className="required mb-1">
                    Avatar
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    placeholder="Avatar"
                    name="image"
                    onChange={handleOnChangeImageDetail}
                  />
                </div>
                <div className="image-preview" id="imagePreview">
                  {stateProductDetail.image ? (
                    <img
                      src={`data:image/png;base64,${stateProductDetail.image}`}
                      alt="Avatar"
                      style={{ marginBottom: "10px" }}
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </div>
              </div>
            </Form.Item>

            <Form.Item
              label="Màu sắc"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Please input the product color!",
                },
              ]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                value={stateProductDetail.color}
                onChange={(value) => handleFieldChangeDetail("color", value)}
                options={[
                  { value: "Xanh dương" },
                  { value: "Hồng" },
                  { value: "Đỏ" },
                  { value: "Trắng" },
                  { value: "Vàng" },
                  { value: "Xanh lá cây" },
                  { value: "Cam" },
                ]} // Dummy data
              />
            </Form.Item>
            <Form.Item
              label="Chủ đề"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please select the product type!",
                },
              ]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                value={stateProductDetail.type}
                onChange={(value) => handleFieldChangeDetail("type", value)}
                options={[
                  { value: "Hoa chức mừng" },
                  { value: "Hoa cầm tay" },
                  { value: "Hoa cưới cầm tay" },
                  { value: "Hoa tình yêu" },
                  { value: "Hoa Valentine" },
                  { value: "Hoa tặng tốt nghiệp" },
                  { value: "Hoa ngày 8-3" },
                  { value: "Trưng bày trong nhà" },
                ]} // Dummy data
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </DrawerComponent>

        <ModalComponent
          destroyOnClose
          className="submit-data-product"
          title="Xóa sản phẩm"
          open={isModalOpenDelete}
          onCancel={handleCancelDelete}
          onOk={handleDeleteProduct}
          isLoadng={loadingDelete}
        >
          <div>Bạn có muốn xác nhận xóa Sản phẩm này ?</div>
        </ModalComponent>
      </Flex>
    </>
  );
};

export default Products;
