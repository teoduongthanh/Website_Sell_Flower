import React, { useState } from "react";
import {  Button, Dropdown, Space, Table, } from "antd";
import { render } from "@testing-library/react";
import Loading from "../../../Component/LoadingComponent/Loading";
import { DownOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

const TableProductsComponent = (props) => {
  const [rowSelectedKey, setRowSelectedKey] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]); // To hold selected rows data
  
  const {
    selectionType = "checkbox",
    data = [],
    isLoading = false,
    coloums=[],
    handleDeletedMany
  } = props;


  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKey(selectedRowKeys); // Store selected row keys
      setSelectedRowsData(selectedRows); 
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  
  // Extract the names of selected rows for displaying in the dropdown
  const selectedNames = selectedRowsData.map((row) => row.name);

  // Menu for dropdown with selected row names
  const items = selectedNames.map((name, index) => ({
    key: index,
    label: name,
  }));

  const handleDelete = () => {
    // Perform delete action on selected rows
    console.log("Deleting selected rows: ", rowSelectedKey);
    handleDeletedMany(selectedRowsData)
    // Make your API call to delete the selected rows based on rowSelectedKey
  };
  return (
    <Loading isLoading={isLoading}>
      <div>
        <Dropdown
          menu={{
            items,  // Show selected row names in the dropdown
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Selected Items ({selectedNames.length})
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>

        {/* Show the delete button only if rows are selected */}
        {selectedNames.length > 0 && (
          <Button
            type="primary"
            danger
            onClick={handleDelete}
            style={{ marginLeft: "10px" }}
          >
            Delete Selected ({selectedNames.length})
          </Button>
        )}
      </div>

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={coloums}
        dataSource={data}
        {...props}
      
      />
    </Loading>
    
  );
};

export default TableProductsComponent;
