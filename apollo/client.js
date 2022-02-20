import { useMemo } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'

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
          userDB: db.collection('user')
       }
      },
    })
  } else {
    // Client 端 (CSR)
    const { HttpLink } = require('@apollo/client/link/http')
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
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
