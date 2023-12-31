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
        // await client.connect();
        const productCollection = client.db("gadgetHubDB").collection("product");
        const userCollection = client.db("gadgetHubDB").collection("users");
        const brandCollection = client.db("gadgetHubDB").collection("brand");
        const sliderCollection = client.db("gadgetHubDB").collection("slider");
        const brandsliderCollection = client.db("gadgetHubDB").collection("brandslider");
        const cartsCollection = client.db("gadgetHubDB").collection("carts");

        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.post("/products", async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        });

        app.get("/products", async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        });

        app.put("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedProduct = req.body;
            console.log("Hit Update Product with this data", updatedProduct);
            const updateproduct = {
                $set: {
                    productName: updatedProduct.productName,
                    brandName: updatedProduct.brandName,
                    productCat: updatedProduct.productCat,
                    productPrice: updatedProduct.productPrice,
                    productRating: updatedProduct.productRating,
                    productImage: updatedProduct.productImage,
                    productDescription: updatedProduct.productDescription,
                    productFeatured: updatedProduct.productFeatured,
                    productHotSale: updatedProduct.productHotSale,
                },
            };
            const result = await productCollection.updateOne(query, updateproduct, options);
            res.send(result);
        });

        app.delete("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });


        // Brand CRUD Operations 
        app.post("/brands", async (req, res) => {
            const brand = req.body;
            const result = await brandCollection.insertOne(brand);
            res.send(result);
        });

        app.get("/brands", async (req, res) => {
            const cursor = brandCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });


        app.get("/brands/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await brandCollection.findOne(query);
            res.send(result);
        });

        app.put("/brands/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateBrand = req.body;
            const brand = {
                $set: {
                    brandName: updateBrand.brandName,
                    brandImage: updateBrand.brandImage,
                    brandDescription: updateBrand.brandDescription,
                },
            };
            const result = await brandCollection.updateOne(query, brand, options);
            res.send(result);
        });
        app.delete("/brands/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await brandCollection.deleteOne(query);
            res.send(result);
        });

        // Slider CRUD Operations 
        app.post("/sliders", async (req, res) => {
            const slider = req.body;
            const result = await sliderCollection.insertOne(slider);
            res.send(result);
        });

        app.get("/sliders", async (req, res) => {
            const cursor = sliderCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });


        app.get("/sliders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await sliderCollection.findOne(query);
            res.send(result);
        });

        app.put("/sliders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateSlider = req.body;
            const slider = {
                $set: {
                    sliderTitle: updateSlider.sliderTitle,
                    sliderImage: updateSlider.sliderImage,
                    sliderDescription: updateSlider.sliderDescription,
                },
            };
            const result = await sliderCollection.updateOne(query, slider, options);
            res.send(result);
        });
        app.delete("/sliders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await sliderCollection.deleteOne(query);
            res.send(result);
        });

        // Add to Cart Prodcut Complete CRUD 
        app.post("/carts", async (req, res) => {
            const product = req.body;
            const result = await cartsCollection.insertOne(product);
            res.send(result);
        });
        app.get("/carts", async (req, res) => {
            const cursor = cartsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartsCollection.deleteOne(query);
            res.send(result);
        });
        

        
        // Brand Slider CRUD Operations 
        app.post("/brandsliders", async (req, res) => {
            const slider = req.body;
            const result = await brandsliderCollection.insertOne(slider);
            res.send(result);
        });

        app.get("/brandsliders", async (req, res) => {
            const cursor = brandsliderCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });


        app.get("/brandsliders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await brandsliderCollection.findOne(query);
            res.send(result);
        });

        app.put("/brandsliders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateSlider = req.body;
            const slider = {
                $set: {
                    sliderTitle: updateSlider.sliderTitle,
                    sliderImage: updateSlider.sliderImage,
                    sliderDescription: updateSlider.sliderDescription,
                    sliderBrand: updateSlider.sliderBrand,

                },
            };
            const result = await brandsliderCollection.updateOne(query, slider, options);
            res.send(result);
        });
        
        app.delete("/brandsliders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await brandsliderCollection.deleteOne(query);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
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
