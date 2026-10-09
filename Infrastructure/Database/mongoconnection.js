const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://mongo:27017");

async function connetToMongo() {
  await client.connect();

  console.log("Connected to MongoDB");

  const db = client.db("posts_db");
  const posts = db.collection("posts");

  return posts;
}

module.exports = connetToMongo;
