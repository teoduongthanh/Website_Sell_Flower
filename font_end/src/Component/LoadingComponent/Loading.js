import React from "react";
import { Spin } from "antd";

const Loading = ({ children, isLoading}) => {
  return (
    <>
    <Spin spinning={isLoading} delay={500}>
      {children}
    </Spin>
    </>
  );
};

export default Loading;
