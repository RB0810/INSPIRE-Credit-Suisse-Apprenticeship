const client = require("./config");

async function loginAuth(emailid, pwd){
    try{
        await client.connect();

        const database = client.db("INSPIRE");
        const col = database.collection("user");
        const user = await col.findOne({email: emailid, password: pwd});
        console.log(user);
        return user;


    }catch (error) {
        console.error("Error occurred:", error);
    }
};

async function insertUser(doc){
    try {
      await client.connect();
  
      const database = client.db("INSPIRE");
      const col = database.collection("user");
      await col.insertOne(doc);
      console.log("User inserted successfully:", result.modifiedCount);
      return true;
    } catch (error) {
      console.error("Error occurred:", error);
      return false;
    }
  }

async function findReflection(user123){
  try{
    await client.connect();

    const database = client.db("INSPIRE");
    const col = database.collection("user");

    const userfound = await col.findOne({name: user123});
    console.log(userfound.reflection);
    return userfound.reflection;
  } catch (error){
    console.error("Error occurred:", error);
    return false;
  }
}

async function insertReflection(user123, obj){
  try{
    await client.connect();

    const database = client.db("INSPIRE");
    const col = database.collection("user");

    const filter = { name: user123 };
    const update = { $push: { reflection: obj } };
  
    const result = await col.updateOne(filter, update);
    console.log("Reflection inserted successfully:", result.modifiedCount);
    return true;
  } catch (error){
    console.error("Error occurred:", error);
    return false;
  }
}

module.exports = { loginAuth , insertUser , findReflection , insertReflection }