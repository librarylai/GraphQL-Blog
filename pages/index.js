import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { initializeApollo } from '@/apollo/client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import PostCard from '@/components/card/PostCard'
import PostDialog from '@/components/dialog/PostDialog'
import { useImmer } from 'use-immer'
import { ALL_POST_QUERY, ADD_POST_QUERY, COMMENTS_SUBSCRIPTION, ADD_COMMENT } from '../graphql/gql/blog'
import { useAllPostQueryQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } from '@/generated/generated'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
const LoadingWrapper = styled.div`
  margin-top: 60px;
  font-size: 38px;
  font-weight: bold;
  color: #74738554;
`
const ErrorWrapper = styled.div`
  margin-top: 60px;
  font-size: 38px;
  font-weight: bold;
  color: red;
`
const InitDialogPost = {
  id: '',
  title: '',
  content: '',
  authorId: 1, // 預設給自己
  isEdit: false,
}
const Index = () => {
  const [state, setState] = useImmer({
    isOpenDialog: false,
  })
  const [post, setPost] = useState(InitDialogPost)
  const { isOpenDialog } = state
  // AllPostQuery
  const { data, loading: allPostDataLoading, error: allPostDataError } = useAllPostQueryQuery()
  // useAddPostMutation
  // const [addPost] = useMutation(ADD_POST_QUERY, {
  //   update(cache, { data: { addPost } }) {
  //     let newData = { allPost: [...addPost] }
  //     cache.writeQuery({
  //       query: ALL_POST_QUERY,
  //       data: newData,
  //     })
  //   },
  // })
  const [addPost] = useAddPostMutation({
    update(cache, { data: { addPost } }) {
      let newData = { allPost: [...addPost] }
      cache.writeQuery({
        query: ALL_POST_QUERY,
        data: newData,
      })
    },
  })
  // useUpdatePostMutation 更新文章
  const [updatePost] = useUpdatePostMutation() //  If a cached object already exists with this key, Apollo Client overwrites any existing fields that are also included in the mutation response
  // useDeletePostMutation 刪除文章
  const [deletePost] = useDeletePostMutation({
    // refetchQueries: [ALL_POST_QUERY], // 會多呼叫 ALL_POST_QUERY API 效能較差
    update(cache, { data: { deletePost } }) {
      let newData = { allPost: [...deletePost] }
      cache.writeQuery({
        query: ALL_POST_QUERY,
        data: newData,
      })
    },
  })
  // 增加評論
  const [addComment, { data: commentData, loading: commentloadingStatus }] = useMutation(ADD_COMMENT)

  // 點擊 Card 編輯按鈕
  function handleEdit(postItem) {
    const { id, title, content, author } = postItem
    handleToggleDialog(true)
    setPost({
      id,
      title,
      content,
      authorId: author.id,
      isEdit: true,
    })
  }

  function handleTitleChange(e) {
    setPost({
      ...post,
      title: e.target.value,
    })
  }
  function handleContentChange(e) {
    setPost({
      ...post,
      content: e.target.value,
    })
  }
  function handleAuthorChange(e) {
    setPost({
      ...post,
      authorId: e.target.value,
    })
  }
  // 點擊 Card 刪除按鈕
  async function handleDelete(postItem) {
    await deletePost({ variables: { postId: postItem.id } })
  }
  // 點擊 Card 送出評論
  async function handleSandComment(postItem) {
    const { id, authorId, comment } = postItem

    await addComment({
      variables: {
        postId: id,
        authorId: 1,
        comment: comment,
      },
    })
  }
  // 清空 dialogCard 內資料
  function handleClose() {
    handleToggleDialog(false)
    setPost(InitDialogPost)
  }
  // Dialog 開關
  function handleToggleDialog(status) {
    setState((draft) => {
      draft.isOpenDialog = status
    })
  }

  // 新增文章
  async function handleAddNewPost() {
    addPost({
      variables: { title: post.title, content: post.content, authorId: post.authorId },
    })
    handleClose()
  }
  // 更新文章內容
  async function handleUpdatePost() {
    updatePost({
      variables: {
        postId: post.id,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
      },
    })
    handleClose()
  }
  // render 所有文章
  function renderAllPosts() {
    return data?.allPost.map((postItem) => {
      const { id } = postItem
      return (
        <Box key={id} mr={10} mb={5}>
          <PostCard
            data={postItem}
            buttonProps={{
              handleEdit: handleEdit,
              handleDelete: handleDelete,
              handleSandComment: handleSandComment,
            }}
          />
        </Box>
      )
    })
  }
  function renderView() {
    if (allPostDataLoading) return <LoadingWrapper>Loading....</LoadingWrapper>
    if (allPostDataError) return <ErrorWrapper>系統發生錯誤，請再重試一次</ErrorWrapper>
    return renderAllPosts()
  }
  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{renderView()}</Box>
      <Button id='addPost' variant='contained' onClick={handleToggleDialog}>
        新增文章
      </Button>
      <PostDialog
        post={post}
        open={isOpenDialog}
        handleClose={handleClose}
        handleSubmit={post.isEdit ? handleUpdatePost : handleAddNewPost}
        titleProps={{ handleTitleChange: handleTitleChange }}
        contentProps={{ handleContentChange: handleContentChange }}
        authorProps={{ handleAuthorChange: handleAuthorChange }}
      />
    </div>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: ALL_POST_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
