import { MongoClient } from 'mongodb'

let db = null
async function getDB() {
  try {
    // 方便 Demo ,之後轉移近 .env
    const uri = 'mongodb+srv://graphql-blog:9DuxZbdFfG1j1z1h@cluster0.hboxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const dbClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const client = await dbClient.connect()
    db = client.db('graphql-blog') // database name
    return db
  } catch (e) {
    console.log('--->error while connecting with graphql context (db)', e)
  }
}

export  { getDB }
