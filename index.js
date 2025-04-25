import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";

let url = "mongodb://localhost:27017"

let client = new MongoClient(url);
let connect = async () => {
//   Connection and server
    await client.connect();
    let database = client.db("coffe_compass");
    let server = express();
    
    // Middleware
    server.use(express.json());
    server.use(cors());
    
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

    server.get("/coffees/:id", async (req, res) => {
        let { id } = req.params;
        let query = {_id: new ObjectId(id)};
        let result = await coffeesCollection.findOne(query);
        res.send(result);
    })


    server.post("/coffees", async (req, res) => {
        let {name, description, origin, roast, arabica, roastery_id, img_src} = req.body;
        let query = {name, description, origin, roast, arabica, roastery_id, img_src};
        let result = await coffeesCollection.insertOne(query);

        res.status(201).json({
            message: "Coffee added",
            coffeId: result.insertedId
        })
    })



    server.patch("/coffees/:id", async (req, res) => {
        let { id } = req.params;
        let {name, description, origin, roast, arabica, roastery_id, img_src} = req.body;
        let query = { _id: new ObjectId(id)}
        let result = await coffeesCollection.updateOne(query, {$set: {name, description, origin, roast, arabica, roastery_id, img_src}})
        res.status(201).json({
            message: "Coffee updated",
            updatedCount: result.modifiedCount
        })
    })

    server.delete("/coffees/:id", async (req, res) => {
        let { id } = req.params;
        let query = {_id: new ObjectId(id)}
        let result = await coffeesCollection.deleteOne(query);
        res.status(200).json({
            message: "Coffee removed successfully",
            deletedCount: result.deletedCount
        })
    })
    
    server.listen(4000, () => {
        console.log("Server started")
    })
    console.log("Connected")
    
}
connect();
