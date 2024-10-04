import { Drawer ,Modal} from "antd";
import React from "react";
const DrawerComponent = ({ title='drawer', placement = "right", isOpen=false, onClose,isLoadingDrawer, children,...rests }) => {
  return (
    <Drawer 
      
      title={title} 
      placement={placement}  
      open={isOpen} 
      onClose={onClose} 
      {...rests}
      loading={isLoadingDrawer}
    >
      {children}
    </Drawer>
  );
};

export default DrawerComponent;