import gql from 'graphql-tag'

export const ALL_POST_QUERY = gql`
  query AllPostQuery {
    viewAllPost {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`
export const ADD_POST_QUERY = gql`
  mutation AddPost($title: String, $content: String, $authorId: ID) {
    addPost(title: $title, content: $content, authorId: $authorId) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`
export const UPDATE_POST_QUERY = gql`
  mutation UpdatePost($postId: ID, $title: String, $content: String, $authorId: ID) {
    updatePost(postId: $postId, title: $title, content: $content, authorId: $authorId) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`
export const DELETE_POST_QUERY = gql`
  mutation DeletePost($postId: ID) {
    deletePost(postId: $postId) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`
// 新增評論
export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID, $comment: String, $authorId: ID) {
    addComment(postId: $postId, comment: $comment, authorId: $authorId) {
      comment
    }
  }
`
