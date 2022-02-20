import gql from 'graphql-tag'

export const ALL_POST_QUERY = gql`
  query AllPostQuery {
    viewAllPost {
      id
      title
      content
    }
  }
`
export const ADD_POST_QUERY = gql`
  mutation AddPost($title: String, $content: String) {
    addPost(title: $title, content: $content) {
      id
      title
    }
  }
`
export const UPDATE_POST_QUERY = gql`
  mutation UpdatePost($postId: ID, $title: String, $content: String) {
    updatePost(postId: $postId, title: $title, content: $content){
      id
      title
    }
  }
`
export const DELETE_POST_QUERY = gql`
  mutation DeletePost($postId: ID) {
    deletePost(postId: $postId) {
      id
      title
    }
  }
`