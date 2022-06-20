import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  viewAllPost?: Maybe<Array<Maybe<Post>>>;
  viewer?: Maybe<User>;
  viewPost?: Maybe<Post>;
};


export type QueryViewPostArgs = {
  postId?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  notifications?: Maybe<Array<Maybe<Notification>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
  sortNotifications?: Maybe<Array<Maybe<Notification>>>;
  status: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  content?: Maybe<Content>;
  id?: Maybe<Scalars['ID']>;
};

export type Content = {
  __typename?: 'Content';
  createTime?: Maybe<Scalars['String']>;
  isRead?: Maybe<Scalars['Boolean']>;
  subTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Array<Maybe<Comment>>>;
  addPost?: Maybe<Array<Maybe<Post>>>;
  deletePost?: Maybe<Array<Maybe<Post>>>;
  updateNotification?: Maybe<Result>;
  updatePost?: Maybe<Array<Maybe<Post>>>;
};


export type MutationAddCommentArgs = {
  authorId?: InputMaybe<Scalars['ID']>;
  comment?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
};


export type MutationAddPostArgs = {
  authorId?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  postId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateNotificationArgs = {
  notificationId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdatePostArgs = {
  authorId?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  postID: Scalars['ID'];
};

export type Result = {
  __typename?: 'Result';
  status?: Maybe<Scalars['Boolean']>;
};

export type AllPostQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostQueryQuery = { __typename?: 'Query', viewAllPost?: Array<{ __typename?: 'Post', id: string, title: string, content: string, author?: { __typename?: 'User', id: string, name: string } | null } | null> | null };

export type AddPostMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  authorId?: InputMaybe<Scalars['ID']>;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost?: Array<{ __typename?: 'Post', id: string, title: string, content: string, author?: { __typename?: 'User', id: string, name: string } | null } | null> | null };

export type UpdatePostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  authorId?: InputMaybe<Scalars['ID']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Array<{ __typename?: 'Post', id: string, title: string, content: string, author?: { __typename?: 'User', id: string, name: string } | null } | null> | null };

export type DeletePostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['ID']>;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: Array<{ __typename?: 'Post', id: string, title: string, content: string, author?: { __typename?: 'User', id: string, name: string } | null } | null> | null };

export type AddCommentMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['ID']>;
  comment?: InputMaybe<Scalars['String']>;
  authorId?: InputMaybe<Scalars['ID']>;
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment?: Array<{ __typename?: 'Comment', comment?: string | null } | null> | null };

export type FetchNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchNotificationsQuery = { __typename?: 'Query', user?: { __typename?: 'User', sortNotifications?: Array<{ __typename?: 'Notification', id?: string | null, content?: { __typename?: 'Content', title?: string | null, subTitle?: string | null, createTime?: string | null, isRead?: boolean | null } | null } | null> | null, notifications?: Array<{ __typename?: 'Notification', id?: string | null, content?: { __typename?: 'Content', title?: string | null, subTitle?: string | null, createTime?: string | null, isRead?: boolean | null } | null } | null> | null } | null };

export type FetchNotificationsTitleQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchNotificationsTitleQuery = { __typename?: 'Query', user?: { __typename?: 'User', notifications?: Array<{ __typename?: 'Notification', id?: string | null, content?: { __typename?: 'Content', title?: string | null } | null } | null> | null } | null };

export type FetchNotificationsSubTitleQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchNotificationsSubTitleQuery = { __typename?: 'Query', user?: { __typename?: 'User', notifications?: Array<{ __typename?: 'Notification', id?: string | null, content?: { __typename?: 'Content', subTitle?: string | null } | null } | null> | null } | null };

export type UpdateNotificationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateNotificationMutation = { __typename?: 'Mutation', updateNotification?: { __typename?: 'Result', status?: boolean | null } | null };


export const AllPostQueryDocument = gql`
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
    `;

/**
 * __useAllPostQueryQuery__
 *
 * To run a query within a React component, call `useAllPostQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostQueryQuery(baseOptions?: Apollo.QueryHookOptions<AllPostQueryQuery, AllPostQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostQueryQuery, AllPostQueryQueryVariables>(AllPostQueryDocument, options);
      }
export function useAllPostQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostQueryQuery, AllPostQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostQueryQuery, AllPostQueryQueryVariables>(AllPostQueryDocument, options);
        }
export type AllPostQueryQueryHookResult = ReturnType<typeof useAllPostQueryQuery>;
export type AllPostQueryLazyQueryHookResult = ReturnType<typeof useAllPostQueryLazyQuery>;
export type AllPostQueryQueryResult = Apollo.QueryResult<AllPostQueryQuery, AllPostQueryQueryVariables>;
export const AddPostDocument = gql`
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
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const UpdatePostDocument = gql`
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
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
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
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const AddCommentDocument = gql`
    mutation AddComment($postId: ID, $comment: String, $authorId: ID) {
  addComment(postId: $postId, comment: $comment, authorId: $authorId) {
    comment
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      comment: // value for 'comment'
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const FetchNotificationsDocument = gql`
    query fetchNotifications {
  user {
    sortNotifications @client {
      id
      content {
        title
        subTitle
        createTime
        isRead
      }
    }
    notifications {
      id
      content {
        title
        subTitle
        createTime
        isRead
      }
    }
  }
}
    `;

/**
 * __useFetchNotificationsQuery__
 *
 * To run a query within a React component, call `useFetchNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<FetchNotificationsQuery, FetchNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchNotificationsQuery, FetchNotificationsQueryVariables>(FetchNotificationsDocument, options);
      }
export function useFetchNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchNotificationsQuery, FetchNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchNotificationsQuery, FetchNotificationsQueryVariables>(FetchNotificationsDocument, options);
        }
export type FetchNotificationsQueryHookResult = ReturnType<typeof useFetchNotificationsQuery>;
export type FetchNotificationsLazyQueryHookResult = ReturnType<typeof useFetchNotificationsLazyQuery>;
export type FetchNotificationsQueryResult = Apollo.QueryResult<FetchNotificationsQuery, FetchNotificationsQueryVariables>;
export const FetchNotificationsTitleDocument = gql`
    query fetchNotificationsTitle {
  user {
    notifications {
      id
      content {
        title
      }
    }
  }
}
    `;

/**
 * __useFetchNotificationsTitleQuery__
 *
 * To run a query within a React component, call `useFetchNotificationsTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchNotificationsTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchNotificationsTitleQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchNotificationsTitleQuery(baseOptions?: Apollo.QueryHookOptions<FetchNotificationsTitleQuery, FetchNotificationsTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchNotificationsTitleQuery, FetchNotificationsTitleQueryVariables>(FetchNotificationsTitleDocument, options);
      }
export function useFetchNotificationsTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchNotificationsTitleQuery, FetchNotificationsTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchNotificationsTitleQuery, FetchNotificationsTitleQueryVariables>(FetchNotificationsTitleDocument, options);
        }
export type FetchNotificationsTitleQueryHookResult = ReturnType<typeof useFetchNotificationsTitleQuery>;
export type FetchNotificationsTitleLazyQueryHookResult = ReturnType<typeof useFetchNotificationsTitleLazyQuery>;
export type FetchNotificationsTitleQueryResult = Apollo.QueryResult<FetchNotificationsTitleQuery, FetchNotificationsTitleQueryVariables>;
export const FetchNotificationsSubTitleDocument = gql`
    query fetchNotificationsSubTitle {
  user {
    notifications {
      id
      content {
        subTitle
      }
    }
  }
}
    `;

/**
 * __useFetchNotificationsSubTitleQuery__
 *
 * To run a query within a React component, call `useFetchNotificationsSubTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchNotificationsSubTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchNotificationsSubTitleQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchNotificationsSubTitleQuery(baseOptions?: Apollo.QueryHookOptions<FetchNotificationsSubTitleQuery, FetchNotificationsSubTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchNotificationsSubTitleQuery, FetchNotificationsSubTitleQueryVariables>(FetchNotificationsSubTitleDocument, options);
      }
export function useFetchNotificationsSubTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchNotificationsSubTitleQuery, FetchNotificationsSubTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchNotificationsSubTitleQuery, FetchNotificationsSubTitleQueryVariables>(FetchNotificationsSubTitleDocument, options);
        }
export type FetchNotificationsSubTitleQueryHookResult = ReturnType<typeof useFetchNotificationsSubTitleQuery>;
export type FetchNotificationsSubTitleLazyQueryHookResult = ReturnType<typeof useFetchNotificationsSubTitleLazyQuery>;
export type FetchNotificationsSubTitleQueryResult = Apollo.QueryResult<FetchNotificationsSubTitleQuery, FetchNotificationsSubTitleQueryVariables>;
export const UpdateNotificationDocument = gql`
    mutation updateNotification($id: ID) {
  updateNotification(notificationId: $id) {
    status
  }
}
    `;
export type UpdateNotificationMutationFn = Apollo.MutationFunction<UpdateNotificationMutation, UpdateNotificationMutationVariables>;

/**
 * __useUpdateNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationMutation, { data, loading, error }] = useUpdateNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationMutation, UpdateNotificationMutationVariables>(UpdateNotificationDocument, options);
      }
export type UpdateNotificationMutationHookResult = ReturnType<typeof useUpdateNotificationMutation>;
export type UpdateNotificationMutationResult = Apollo.MutationResult<UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>;