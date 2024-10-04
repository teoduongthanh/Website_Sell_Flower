import { Button, Card, Flex, Typography } from "antd";
import React from "react";

const Banner = () => {
  return (
    <Card style={{ height: 260, padding: "20px" }}>
      <Flex vertical gap="30px">
        <Flex vertical align="flex-start">
          <Typography.Title level={2} strong>
            Create and sell product
          </Typography.Title>
          <Typography.Text type="secondary" strong>
            Create a React Dashboard with Ant Design | Build a React Website
            Dashboard | Build a React Web App
          </Typography.Text>
        </Flex>
        <Flex gap="large">
          <Button type="primary" size="large">Explore More</Button>
          <Button size="large">Top Sellers</Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Banner;
