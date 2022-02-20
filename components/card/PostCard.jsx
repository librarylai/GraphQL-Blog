import React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function PostCard({ cardProps, data, buttonProps = {} }) {
  const { handleDelete, handleEdit } = buttonProps
  const { title, content,author:{name} } = data
  return (
    <Card sx={{width:'350px'}} {...cardProps} >
      <CardContent>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2'>{content}</Typography>
        <Typography variant='body2'>{`作者：${name}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => handleEdit(data)}>
          編輯
        </Button>
        <Button size='small' color='error' onClick={() => handleDelete(data)}>
          刪除
        </Button>
      </CardActions>
    </Card>
  )
}

PostCard.propTypes = {
  buttonProps: PropTypes.object,
  cardProps: PropTypes.object,
  data: PropTypes.object,
}

export default PostCard
