import { useMemo } from 'react'
import { split, ApolloClient, InMemoryCache } from '@apollo/client'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import _ from 'lodash'
let apolloClient

function createIsomorphLink() {
  // server / statie 端 (SSR,SSG)
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { schema } = require('./schema')
    const { getDB } = require('../mongodb')
    return new SchemaLink({
      schema,
      context: async () => {
        let db = await getDB()
        return {
          blogDB: db.collection('blog'),
          userDB: db.collection('user'),
        }
      },
    })
  } else {
    // Client 端 (CSR)
    const { HttpLink } = require('@apollo/client/link/http')
    const { GraphQLWsLink } = require('@apollo/client/link/subscriptions')
    const wsLink = new GraphQLWsLink(
      createClient({
        url: '/api/graphql',
      })
    )
    const httpLink = new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        // 如果 operation 為 subscription 則 return true
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      },
      wsLink, // 如果是 true 則為 wsLink
      httpLink // 如果是 false 則為 httpLink
    )
    return splitLink
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            // read function
            sortNotifications: (existing, { readField }) => {
              // 注意：這邊我們使用了淺拷貝，因為 readField() 是 immutable
              const notifications = [...readField('notifications')]
              // use lodash orderBy
              const sortData = _.orderBy(
                notifications,
                (item) => {
                  // 取出每筆 notification 裡面的 content field
                  const content = readField('content', item)
                  return content.createTime
                },
                ['desc']
              )
              return sortData
            },
            /* same this */
            // sortNotifications: {
            //   read: () =>{}
            // }
            notifications: {
              merge: (existing, incoming) => {
                return [...(existing ?? []), ...incoming]
              },
            },
          },
        },
      },
    }),
    connectToDevTools: !(process.env.NODE_ENV === 'production'),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
