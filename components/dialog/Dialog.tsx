import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'

interface IDialogProps {
	title?: () => React.ReactNode | string | React.ReactNode
	content?: () => React.ReactNode | string | React.ReactNode
	open: boolean
	onClose: () => void
}

const CustomDialog: React.FC<IDialogProps> = ({ title, content, open = false, onClose = () => {}, ...props }) => {
	return (
		<Dialog fullWidth={true} maxWidth={'md'} onClose={onClose} open={open} {...props}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
		</Dialog>
	)
}
export default CustomDialog