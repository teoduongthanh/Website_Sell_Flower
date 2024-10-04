import { Card, Flex, Typography, Image, Button } from "antd";
import React from "react";
import plantData from "../../plantData";

const { Meta } = Card;
const ProductLists = () => {
  return (
    <>
      <Flex align="center" justify="space-between">
        <Typography.Title level={3} className="primary--color" strong>
          My Listing
        </Typography.Title>
        <Button type="link" className="gray--color">
          View ALL
        </Button>
      </Flex>

      <Flex align="center" gap="large">
        {plantData.map((plant) => (
          <Card key={plant.id} hoverable className="plant-card">
            <Image src={plant.picture} style={{ width: "140px" ,height:"170px"}} />
            <Meta title={plant.name} style={{marginTop:"1rem"}}></Meta>
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default ProductLists;
