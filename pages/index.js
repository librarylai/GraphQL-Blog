import { useQuery, useMutation } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import PostCard from '../components/card/PostCard'
import PostDialog from '../components/dialog/PostDialog'
import { useImmer } from 'use-immer'
import { ALL_POST_QUERY, ADD_POST_QUERY, UPDATE_POST_QUERY, DELETE_POST_QUERY } from '../graphql/gql/blog'
const Index = () => {
  const [state, setState] = useImmer({
    dialogPost: {
      id: '',
      title: '',
      content: '',
      isEdit: false,
    },
    isOpenDialog: false,
  })
  const { dialogPost, isOpenDialog } = state
  // query
  const { data, refetch } = useQuery(ALL_POST_QUERY)
  // mutation
  const [addPost] = useMutation(ADD_POST_QUERY)
  const [updatePost] = useMutation(UPDATE_POST_QUERY)
  const [deletePost] = useMutation(DELETE_POST_QUERY)

  // 點擊 Card 編輯按鈕
  function handleEdit(postItem) {
    const { id, title, content } = postItem
    handleTiggleDialog(true)
    setState((draft) => {
      draft.dialogPost.id = id
      draft.dialogPost.title = title
      draft.dialogPost.content = content
      draft.dialogPost.isEdit = true
    })
  }

  function handleTitleChange(e) {
    setState((draft) => {
      draft.dialogPost.title = e.target.value
    })
  }
  function handleContentChange(e) {
    setState((draft) => {
      draft.dialogPost.content = e.target.value
    })
  }
  // 點擊 Card 刪除按鈕
  async function handleDelete(postItem) {
    await deletePost({ variables: { postId: postItem.id } })
    handleRefetch()
  }
  // 清空 dialogCard 內資料
  function handleClose() {
    handleTiggleDialog(false)
    setState((draft) => {
      draft.dialogPost.id = ''
      draft.dialogPost.title = ''
      draft.dialogPost.content = ''
      draft.dialogPost.isEdit = false
    })
  }

  function handleTiggleDialog(status) {
    setState((draft) => {
      draft.isOpenDialog = status
    })
  }
  function handleRefetch() {
    refetch()
    handleTiggleDialog(false)
  }
  // 新增文章
  async function hadleAddNewPost() {
    await addPost({ variables: { title: dialogPost.title, content: dialogPost.content } })
    handleRefetch()
  }
  // 更新文章內容
  async function handleUpdatePost() {
    await updatePost({ variables: { postId: dialogPost.id, title: dialogPost.title, content: dialogPost.content } })
    handleRefetch()
  }
  // render 所有文章
  function renderAllPosts() {
    return data?.viewAllPost.map((postItem) => {
      const { id } = postItem
      return (
        <Box key={id} mr={10} mb={5}>
          <PostCard
            data={postItem}
            buttonProps={{
              handleEdit: handleEdit,
              handleDelete: handleDelete,
            }}
          />
        </Box>
      )
    })
  }
  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{renderAllPosts()}</Box>
      <Button variant='contained' onClick={handleTiggleDialog}>
        新增文章
      </Button>
      <PostDialog
        open={isOpenDialog}
        handleClose={handleClose}
        handleSubmit={dialogPost.isEdit ? handleUpdatePost : hadleAddNewPost}
        inputProps={{ inputValue: dialogPost.title, handleTitleChange: handleTitleChange }}
        textareaProps={{ textareaValue: dialogPost.content, handleContentChange: handleContentChange }}
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
