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
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const FlexEndBox = styled(Box)`
  display: flex;
  justify-content: end;
`
function PostDialog({ post, titleProps = {}, contentProps = {}, authorProps = {}, handleClose, open, handleSubmit }) {
  const { title, content, authorId } = post
  const { handleTitleChange } = titleProps
  const { handleContentChange } = contentProps
  const { handleAuthorChange } = authorProps
  return (
    <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} open={open}>
      <DialogTitle>新增文章</DialogTitle>
      <DialogContent>
        <Box>
          <h4>文章標題</h4>
          <TextField fullWidth aria-label='postDialog-title' label='title' variant='outlined' onChange={handleTitleChange} value={title} />
        </Box>
        <Box>
          <h4>文章內容</h4>
          <TextareaAutosize
            style={{ width: '100%' }}
            aria-label='postDialog-content'
            minRows={10}
            placeholder='Minimum 3 rows'
            onChange={handleContentChange}
            value={content}
          />
        </Box>
        <Box>
          <h4>作者</h4>
          <Select id='demo-simple-select' value={authorId} onChange={handleAuthorChange}>
            <MenuItem value={1}>Library</MenuItem>
            <MenuItem value={2}>小王</MenuItem>
            <MenuItem value={3}>小賴</MenuItem>
          </Select>
        </Box>
        <FlexEndBox>
          <Button id='addPostSubmit' variant='contained' onClick={handleSubmit}>
            送出
          </Button>
        </FlexEndBox>
      </DialogContent>
    </Dialog>
  )
}

PostDialog.propTypes = {
  authorProps: PropTypes.object,
  contentProps: PropTypes.object,
  data: PropTypes.object,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  open: PropTypes.bool,
  titleProps: PropTypes.object,
}

export default PostDialog
