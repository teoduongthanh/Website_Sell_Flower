import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({title , isOpen,isLoadng = false,children, ...rests}) => {
  return (
    <Modal title={title} open={isOpen = false} {...rests} loading={isLoadng}>
        {children}
      </Modal>
  )
}

export default ModalComponent
