const client = require("./config");
const { ObjectId } = require("mongodb");

async function findBias() {
  try {
    await client.connect();

    const database = client.db("INSPIRE");
    const col = database.collection("bias");
    const cursor = await col.find();
    const allBias = await cursor.toArray();
    console.log(allBias);
    return allBias;

  } catch (error) {
    console.error("Error occurred:", error);
  } 
}

async function biasPage(arg){
  try {
    await client.connect();

    const database = client.db("INSPIRE");
    const col = database.collection("bias");
    const biasReqd = await col.findOne({_id: new ObjectId(arg)});
    return biasReqd;
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

async function insertExperience(biasId, experienceObject){
  try {
    await client.connect();

    const database = client.db("INSPIRE");
    const col = database.collection("bias");

    const filter = { _id: new ObjectId(biasId) };
    const update = { $push: { experience: experienceObject } };

    const result = await col.updateOne(filter, update);
    console.log("Experience inserted successfully:", result.modifiedCount);
    return true;

  } catch (error) {
    console.error("Error occurred:", error);
    return false;
  }
}

module.exports = {findBias, biasPage, insertExperience};