import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'

let db = null
async function getDB() {
  try {
    // 方便 Demo ,之後轉移近 .env
    const uri = process.env.DB_URL
    const dbClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    })
    const client = await dbClient.connect()
    db = client.db('graphql-blog') // database name
    return db
  } catch (e) {
    console.log('--->error while connecting with graphql context (db)', e)
  }
}

export { getDB }
