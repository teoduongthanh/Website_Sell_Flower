import React from 'react'
import { Avatar, Button, Flex, Typography } from 'antd'
import Search from 'antd/es/transfer/search';
import { MessageOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const HeaderAdmin = () => {
  const user = useSelector((state) => state?.user);

  return (
    <Flex align='center' justify='space-between' className='tesst'>
      <Typography.Title level={3} type='secondary'>
        Welcome back, {user?.name}
      </Typography.Title>
      <Flex align='center' gap='3rem'>
        <Search placeholder='Search Dashboard' allowClear />
        <Flex align='center' gap="10px">
            <MessageOutlined className='header-icon'/>
            <NotificationOutlined className='header-icon'/>
            <Button
              id="theme-button"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                padding: 0,
                border: "1px solid #fff",
                display:"flex",
                alignItems:"center"
              }}
            >
              
              <img
                src={`data:image/png;base64,${user?.avatar}`}
                alt="User Avatar"
                className="img-fluid rounded-circle"
              />
            </Button>

        </Flex>
      </Flex>
    </Flex>
  )
}

export default HeaderAdmin
