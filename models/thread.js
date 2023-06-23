const client = require("./config");

async function findThread() {
    try {
      await client.connect();

      const database = client.db("INSPIRE");
      const col = database.collection("thread");
      const cursor = await col.find();
      const allThread = await cursor.toArray();
      console.log(allThread);
      return allThread;
  
    } catch (error) {
      console.error("Error occurred:", error);
    } 
  }

  async function threadPage(arg){
    try {
      await client.connect();
  
      const database = client.db("INSPIRE");
      const col = database.collection("thread");
      const threadReqd = await col.findOne({thread: arg});
      return threadReqd;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  async function insertThread(doc){
    try {
      await client.connect();
  
      const database = client.db("INSPIRE");
      const col = database.collection("thread");
      await col.insertOne(doc);
      console.log("Thread inserted successfully:", result.modifiedCount);
      return true;
    } catch (error) {
      console.error("Error occurred:", error);
      return false;
    }
  }

  async function insertPost(threadName, newObject){
    try {
      await client.connect();
  
      const database = client.db("INSPIRE");
      const col = database.collection("thread");
  
      const filter = { thread: threadName };
      const update = { $push: { posts: newObject } };
  
      const result = await col.updateOne(filter, update);
      console.log("Thread inserted successfully:", result.modifiedCount);
      return true;
  
    } catch (error) {
      console.error("Error occurred:", error);
      return false;
    }
  }

module.exports = {findThread , threadPage, insertThread, insertPost}