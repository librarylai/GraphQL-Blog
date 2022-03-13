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
  viewAllPost?: Maybe<Array<Maybe<Post>>>;
  viewer?: Maybe<User>;
  viewPost?: Maybe<Post>;
};


export type QueryViewPostArgs = {
  postId?: InputMaybe<Scalars['ID']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost?: Maybe<Array<Maybe<Post>>>;
  deletePost?: Maybe<Array<Maybe<Post>>>;
  updatePost?: Maybe<Array<Maybe<Post>>>;
};


export type MutationAddPostArgs = {
  authorId?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  postId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdatePostArgs = {
  authorId?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
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