import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { useImmer } from 'use-immer'

function PostDialog({ titleProps = {}, contentProps = {}, handleClose, open, handleSubmit }) {
  const { handleTitleChange,title } = titleProps
  const { handleContentChange,content } = contentProps

  const [state, setState] = useImmer({
    inputText: title || '',
    contentText: content || '',
  })
  const { inputText, contentText } = state


  return (
    <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} open={open}>
      <DialogTitle>新增文章</DialogTitle>
      <DialogContent>
        <Box>
          <h4>文章標題</h4>
          <TextField fullWidth id='outlined-basic' label='title' variant='outlined' onChange={handleTitleChange} value={title} />
        </Box>
        <Box>
          <h4>文章內容</h4>
          <TextareaAutosize style={{ width: '100%' }} aria-label='minimum height' minRows={10} placeholder='Minimum 3 rows' onChange={handleContentChange} value={content} />
        </Box>
        <Button onClick={() => handleSubmit(inputText, contentText)}>送出</Button>
      </DialogContent>
    </Dialog>
  )
}

PostDialog.propTypes = {}

export default PostDialog
