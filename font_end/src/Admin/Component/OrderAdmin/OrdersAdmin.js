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
  import * as OrderService from "../../../services/OrderService";
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
  
  const OrdersAdmin = () => {
    const navigate = useNavigate();
  
    const hadleCreateUser = () => {
      navigate("/register");
    };
  
    const [stateOrder, setStateOrder] = useState([{
      fullName: "",
      address: "",
      phone: "",
      totalPrice: "",
      status:""
    }]);

  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
  
    const userAdmin = useSelector((state) => state?.user);
  

    const mutationCancelOrder = useMutationHooks(async (data) => {
      const { id } = data;
      const res = await OrderService.cancelOrder(id);
      return res;
    });
  
   

    const {
      data: dataDeleted,
      isLoading: isLoadingDeleted,
      isError: isErrorDeleted,
      isSuccess: isSuccessDeleted,
    } = mutationCancelOrder;
  

  
    useEffect(() => {
      if (isSuccessDeleted && dataDeleted?.status == "Ok") {
        message.success("Xóa đơn hàng thành công");
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        handleCancelDelete();
      } else if (isErrorDeleted) {
        message.error("Xảy ra lổi vui lòng kiểm tra lại.");
      }
    }, [isSuccessDeleted, isErrorDeleted]);


    console.log("rowSelected",rowSelected)
    
    const [form] = Form.useForm();

  
    const getAllItemsOrders = async () => {
      const res = await OrderService.getAllOrders();
      return res;
    };
    const queryOrder = useQuery(["orders"], getAllItemsOrders, {
      retry: 3,
      retryDelay: 1000,
    });
    const { isLoading: isLoadingOrder, data: orders } = queryOrder;

  
  
    const renderAction = () => {
      return (
        <>
        <Flex>
        <div>
          <Button className="theme-button theme-color" onClick={onOpenModalConfirm}>Xác nhân đơn hàng</Button>
        </div>
        <div>
          <MdDeleteOutline
            className="ant-btn"
            style={{ fontSize: "26px", margin: "5px", cursor: "pointer" }}
            onClick={onOpenModalDelete}
          />
        </div>
        </Flex>
        </>
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
        title: "Tên khách hàng",
        dataIndex: "fullName",
        render: (text) => <a>{text}</a>,
        sorter: (a, b) => a.name.length - b.name.length,
        ...getColumnSearchProps("name"),
      },
      {
        title: "Tổng hóa đơn",
        dataIndex: "totalPrice",
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
        title: "Đia chỉ",
        dataIndex: "address",
        render: (text) => <a>{text}</a>,
        sorter: (a, b) => a.email.length - b.email.length,
        ...getColumnSearchProps("address"),
      },
      ,
      {
        title: "Số điển thoại",
        dataIndex: "phone",
        render: (text) => <a>{text}</a>,
        sorter: (a, b) => a.email.length - b.email.length,
        ...getColumnSearchProps("phone"),
      }, 
      {
        title: "Tình trạng",
        dataIndex: "status",
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
        title: "Action",
        dataIndex: "action",
        render: renderAction,
      }
    ];
    console.log("orders admin",orders)
    const dataTable = orders?.data?.map((order) => {
      return {
        ...order,
        key: order?._id,
        fullName: order?.shippingAddress?.fullName,
        address: order?.shippingAddress?.address,
        phone: order?.shippingAddress?.phone,
        totalPrice: order?.totalPrice,
        status:'đang giao',
      };
    });

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

    const onOpenModalConfirm = () => {
      setIsModalOpenConfirm(true);
      setTimeout(() => {
        setLoadingDelete(false);
      }, 1000);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    const handleCancelConfirm = () => {
      setIsModalOpenConfirm(false);
    };

    const handleConfirmOrder=()=>{

    }
    const handleCancelDelete = () => {
      setIsModalOpenDelete(false);
    };
    console.log("rowSelected",rowSelected)
    const handleDeleteProduct = () => {
      mutationCancelOrder.mutate(
        { id: rowSelected },
        {
          onSettled: () => {
            queryOrder.refetch();
          },
        }
      );
    };
    console.log("dataTable",dataTable)
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
              // handleDeletedMany={handleDeletedMany}
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
          <ModalComponent
            destroyOnClose
            className="submit-data-user"
            title="Xác nhận đơn hàng đã giao"
            open={isModalOpenConfirm}
            onCancel={handleCancelConfirm}
            onOk={handleConfirmOrder}
            isLoadng={loadingDelete}
          >
            <div>Bạn có muốn xác nhận đơn hàng này không ?</div>
          </ModalComponent>
        </Flex>
      </>
    );
  };
  
  export default OrdersAdmin;
  