const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config()
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7gpv70.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const productCollection = client.db("gadgetHubDB").collection("product");
        const userCollection = client.db("gadgetHubDB").collection("users");
        const brandCollection = client.db("gadgetHubDB").collection("brand");
        const sliderCollection = client.db("gadgetHubDB").collection("slider");

        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })
        app.get("users/:id",async(req,res)=>{
            const id= req.params.id;
            const filter_id = {_id: new ObjectId(id)}
            const result = await userCollection.findOne(filter_id);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("GadgetHub Server is Running");
});


app.listen(port, () => {
    console.log("GadgetHub server is running on", port);
})
