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
import {  SearchOutlined } from "@ant-design/icons";

import TextArea from "antd/es/input/TextArea";

import * as UserService from "../../../services/UserService";
import { useMutationHooks } from "../../../hooks/useMutationHooks";
import Loading from "../../../Component/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const navigate = useNavigate();

  const hadleCreateUser = () => {
    navigate("/register");
  };

  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    address:"",
    isAdmin: false
 
  });
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    address:"",
    isAdmin: false
  });


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [loading, setLoading] = useState(false);

  const userAdmin = useSelector((state) => state?.user);

  const mutationUpdateUser = useMutationHooks(async (data) => {
    const { id ,token , ...rests} = data;
    const res = await UserService.updateUser(
      id,
      rests.dataUpdated,
      token
    );

    return res;
  });
  const mutationDeleted = useMutationHooks(async (data) => {
    const { id, token } = data;

    const res = await UserService.deleteUser(id, token);

    return res;
  });

  const mutationManyDeleted = useMutationHooks(async (data) => {
    const { token, ...rests } = data;

    const res = await UserService.deleteManyUser(rests ,token);

    return res;
  });

  const {
    data: dataUpdated,
    isError: isErrorUpdated,
    isSuccess: isSuccessUpdated,
  } = mutationUpdateUser;

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
    setStateUser({
      name: "",
      email: "",
      phone: "",
      avatar: [""],
      address:"",
      isAdmin: false
    });
  };
  console.log("stateUserDetail",stateUserDetail)


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
      message.error("Xảy ra lổi vui lòng kiểm tra lại.");
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
      message.error("Xảy ra lổi vui lòng kiểm tra lại.");
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
  const fetchGetUsersDetail = async () => {
    const res = await UserService.getDetaisUser(rowSelected, userAdmin.access_token);
    console.log("res data usser",res)
    const dataUser = res?.data[0];
    if (res?.data) {
      setStateUserDetail({
        name: dataUser.name,
        email: dataUser.email,
        avatar: dataUser.avatar,
        phone: dataUser.phone,
        address: dataUser.address,
        isAdmin: dataUser.isAdmin,
      });
    }

    return res;
  };
  useEffect(() => {
    if (rowSelected) {
      fetchGetUsersDetail();
    }
  }, [rowSelected]);
  console.log("rowSelected",rowSelected)
  const handleDetailsUser = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (rowSelected) {
      fetchGetUsersDetail();
    }
    setIsOpenDrawer(true);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: stateUserDetail.name,
      email: stateUserDetail.email,
      avatar: stateUserDetail.avatar,
      phone: stateUserDetail.phone,
      address: stateUserDetail.address,
      isAdmin: stateUserDetail.isAdmin,
    });
  }, [form, stateUserDetail]);

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(userAdmin.access_token);
    return res;
  };
  const queryUser = useQuery(["users"], getAllUsers, {
    retry: 3,
    retryDelay: 1000,
  });
  const { isLoading: isLoadingUser, data: users } = queryUser;
  // Hàm xử lý sự thay đổi giá trị chung cho các input
  const handleChange = (e) => {
    const { name, value } = e.target || {}; // Kiểm tra nếu e.target tồn tại
    setStateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeDetail = (e) => {
    const { name, value } = e.target || {}; // Kiểm tra nếu e.target tồn tại
    setStateUserDetail((prevState) => ({
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
          onClick={handleDetailsUser}
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
      title: "Admin",
      dataIndex: "isAdmin",
      filters:[{
        text:"True",
        value: true
      },{
        text:"False",
        value:false
      },
    ]
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
   
    },
    ,
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("address"),
    },
    ,
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar) => (
        <img
          src={`data:image/png;base64,${avatar}`}
          alt="Product Image"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable = users?.data?.map((user) => {
    return {
      ...user,
      key: user._id,
      isAdmin: user.isAdmin ? 'True' : 'False'
    };
  });
  

  const handleOnChangeAvatarDetail = async (e) => {
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
          setStateUserDetail({ avatar: base64String });
        };

        // Convert compressed file to base64 string
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.log("Error compressing the avatar: ", error);
      }
    } else {
      setStateUserDetail({ avatar: null });
    }
  };

  const onFishnisUpdateUser = (values) => {
    const mergedData = { ...values, ...stateUserDetail };
    console.log("Merged stateUser Data onFishnisUpdateUser:", mergedData);
    setStateUserDetail(mergedData);
    onUpdateUser();
  };

  const onUpdateUser = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    
    mutationUpdateUser.mutate(
      {
        id: rowSelected,
        token: userAdmin.access_token,
        dataUpdated: stateUserDetail,
      },
      {
        onSettled: () => {
          queryUser.refetch();
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
      { id: rowSelected, token: userAdmin.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
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
        token: userAdmin?.access_token
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  }
  return (
    <>
      <Flex vertical>
        <div>
          <h2>Quản lý người dùng</h2>
        </div>
        <div>
          <Button style={{marginBottom:"10px"}} onClick={hadleCreateUser}>
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
        <DrawerComponent
          title="Chi tiết sản phầm"
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          width="70%"
          isLoadingDrawer={loading}
        >
          <Form
            onFinish={onFishnisUpdateUser}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input the user name!" },
              ]}
            >
              <Input
                name="name"
                value={stateUserDetail.name}
                onChange={handleChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input the user email!",
                },
              ]}
            >
              <Input
                name="email"
                value={stateUserDetail.email}
                onChange={handleChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input the user phone!",
                },
              ]}
            >
              <Input
                name="phone"
                value={stateUserDetail.phone}
                onChange={handleChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input the user address!",
                },
              ]}
            >
              <TextArea
                name="address"
                value={stateUserDetail.address}
                onChange={handleChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Upload"
              valuePropName="fileList"
              name="avatar"
              rules={[
                {
                  validator(_, value) {
                    if (
                      stateUser.avatar &&
                      stateUser.avatar.size > 819200
                    ) {
                      return Promise.reject(
                        new Error("Avatar must be smaller than 100KB!")
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
                    name="avatar"
                    onChange={handleOnChangeAvatarDetail}
                  />
                </div>
                <div className="image-preview" id="imagePreview">
                  {stateUserDetail.avatar ? (
                    <img
                      src={`data:image/png;base64,${stateUserDetail.avatar}`}
                      alt="Avatar"
                      style={{ marginBottom: "10px" }}
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </div>
              </div>
            </Form.Item>
            {/* <Form.Item
              label="Admin"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: "Please select the user isAdmin!",
                },
              ]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                value={stateUserDetail.isAdmin}
                onChange={(value) => handleFieldChangeDetail("isAdmin", value)}
                options={[{ value: "false" }, { value: "true" }]} // Dummy data
              />
            </Form.Item> */}

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </DrawerComponent>

        <ModalComponent
          destroyOnClose
          className="submit-data-user"
          title="Xóa người dùng"
          open={isModalOpenDelete}
          onCancel={handleCancelDelete}
          onOk={handleDeleteProduct}
          isLoadng={loadingDelete}
        >
          <div>Bạn có muốn xác nhận Người dùng này ?</div>
        </ModalComponent>
      </Flex>
    </>
  );
};

export default AdminUser;
