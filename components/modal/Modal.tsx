import MeterialModal from '@mui/material/Modal'
import React from 'react'
interface IModalProps {
  open: boolean
  onClose: () => void
}

const Modal: React.FC<IModalProps> = ({ children, open = false, onClose = () => {}, ...props }) => {
  return (
    <MeterialModal open={open} onClose={onClose} {...props}>
      <div>{children}</div>
    </MeterialModal>
  )
}
export default Modal
