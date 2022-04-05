import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import { COMMENTS_SUBSCRIPTION } from '../../graphql/gql/blog'
import { useSubscription } from '@apollo/client'

function PostCard({ cardProps, data, buttonProps = {} }) {
  const { handleDelete, handleEdit, handleSandComment } = buttonProps
  const {
    id,
    title,
    content,
    author: { name },
  } = data
  const [comment, setComment] = useState('')
  //  useSubscription
  const { commentSubscriptData, loading } = useSubscription(COMMENTS_SUBSCRIPTION, { variables: { postId: id } })
  console.log('commentSubscriptData',commentSubscriptData)
  return (
    <Card sx={{ width: '350px' }} {...cardProps}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2'>{content}</Typography>
        <Typography variant='body2'>{`作者：${name}`}</Typography>
      </CardContent>
      <CardContent>
        <Typography variant='h5' component='div'>
          評論：
        </Typography>
        <Input color='secondary' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='寫上評論' variant='outlined' />
        <Button size='small' variant='contained' onClick={() => handleSandComment({ ...data, comment })}>
          送出評論
        </Button>
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
