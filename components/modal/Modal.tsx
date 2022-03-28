import MaterialModal from '@mui/material/Modal'
import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
	width: 600px;
	min-height: 400px;
	background-color: #fafafa;
	display: flex;
	justify-content: center;
	align-content: center;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`
interface IModalProps {
	open: boolean
	onClose: () => void
}

const Modal: React.FC<IModalProps> = ({ children, open = false, onClose = () => {}, ...props }) => {
	return (
		<MaterialModal open={open} onClose={onClose} {...props}>
			<ModalContainer>{children}</ModalContainer>
		</MaterialModal>
	)
}
export default Modal
