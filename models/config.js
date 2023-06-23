const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://rishika0810banka:Rishi_0810@cluster0.adq4xds.mongodb.net/INSPIRE?retryWrites=true&w=majority";
const client = new MongoClient(uri);
console.log("Connected to mongo");

module.exports = client;

