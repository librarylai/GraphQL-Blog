import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import PostCard from '../components/card/PostCard'
import PostDialog from '../components/dialog/PostDialog'
import { useImmer } from 'use-immer'
const AllBlogQuery = gql`
  query AllBlogQuery {
    viewAllBlogs {
      id
      title
      content
    }
  }
`
const ADD_POST = gql`
  # Increments a back-end counter and gets its resulting value
  mutation AddPost($title: String, $content: String) {
    addPost(title: $title, content: $content) {
      id
      title
    }
  }
`
const DELETE_POST = gql`
  # Increments a back-end counter and gets its resulting value
  mutation DeletePost($postId: ID) {
    deletePost(postId: $postId) {
      id
      title
    }
  }
`
const Index = () => {
  const [state, setState] = useImmer({
    dialogPost: {
      title: '',
      content: '',
      isEdit: false,
    },
    isOpenDialog: false,
  })
  const { dialogPost, isOpenDialog } = state
  // query
  const { data } = useQuery(AllBlogQuery)
  // mutation
  const [addPost] = useMutation(ADD_POST)
  const [deletePost] = useMutation(DELETE_POST)

  // 點擊 Card 編輯按鈕
  function handleEdit(postItem) {
    const { title, content } = postItem
    handleTiggleDialog(true)
    setState((draft) => {
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
  // 點擊 Card 修改按鈕
  async function handleDelete(postItem) {
    const { data } = await deletePost({ variables: { postId: postItem.id } })
  }
  // 清空 dialogCard 內資料
  function handleClose() {
    handleTiggleDialog(false)
    setState((draft) => {
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

  async function hadleAddNewPost() {
    const { data } = await addPost({ variables: { title: dialogPost.title, content: dialogPost.content } })
    handleTiggleDialog(false)
  }
  // render 所有文章
  function renderAllPosts() {
    return data?.viewAllBlogs.map((postItem) => {
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
        handleSubmit={hadleAddNewPost}
        titleProps={{ title: dialogPost.title, handleTitleChange: handleTitleChange }}
        contentProps={{ content: dialogPost.content, handleContentChange: handleContentChange }}
      />
    </div>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()
  // await apolloClient.query({
  //   query: ViewerQuery,
  // })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
