import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import { getDB } from '../../mongodb'
const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    let db = await getDB()
    return { db: db.collection('blog') }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}
export default apolloServer.createHandler({ path: '/api/graphql' })
