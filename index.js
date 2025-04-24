import { MongoClient } from "mongodb";
import express from "express";

let url = "mongodb://localhost:27017"

let client = new MongoClient(url);
let connect = async () => {
//   Connection and server
    await client.connect();
    let database = client.db("coffe_compass");
    let server = express();
    
    // Middleware
    server.use(express.json());
    
    // Collections
    let coffeesCollection = database.collection("coffees");
    let reviewsCollection = database.collection("reviews");
    let usersCollection = database.collection("users");
    let notesCollection = database.collection("notes");
    let roasteriesCollection = database.collection("roasteries");

    // GET ALL COFFEES
    server.get("/coffees", async (req, res) => {
        let result = await coffeesCollection.find().toArray();
        res.send(result);
    })
    
    server.listen(4000, () => {
        console.log("Server started")
    })
    console.log("Connected")
    
}
connect();
