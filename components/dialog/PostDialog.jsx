import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { styled } from '@mui/material/styles'

const FlexEndBox = styled(Box)`
  display: flex;
  justify-content: end;
`
function PostDialog({ inputProps = {}, textareaProps = {}, handleClose, open, handleSubmit }) {
  const { handleTitleChange, inputValue } = inputProps
  const { handleContentChange, textareaValue } = textareaProps

  return (
    <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} open={open}>
      <DialogTitle>新增文章</DialogTitle>
      <DialogContent>
        <Box>
          <h4>文章標題</h4>
          <TextField fullWidth id='outlined-basic' label='title' variant='outlined' onChange={handleTitleChange} value={inputValue} />
        </Box>
        <Box>
          <h4>文章內容</h4>
          <TextareaAutosize style={{ width: '100%' }} aria-label='minimum height' minRows={10} placeholder='Minimum 3 rows' onChange={handleContentChange} value={textareaValue} />
        </Box>
        <FlexEndBox>
          <Button variant='contained' onClick={() => handleSubmit(inputValue, textareaValue)}>
            送出
          </Button>
        </FlexEndBox>
      </DialogContent>
    </Dialog>
  )
}

PostDialog.propTypes = {}

export default PostDialog
