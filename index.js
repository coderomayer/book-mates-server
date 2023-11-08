const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://omayer:mx8iqTtgwCPVB4N1@cluster0.ussu9py.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongo() {
  
  try {

    // Connect the client to the server (optional starting in v4.7)
    // await client.connect();

    console.log("Connected to MongoDB");

    const bookCategory = client.db('bookDB').collection('category');
    const allBooks = client.db('bookDB').collection('books')

    app.get('/category', async (req, res) => {
      const Category = await bookCategory.find().toArray();
      res.send(Category);
    });



    app.get('/books', async (req, res) => {
      const books = await allBooks.find().toArray();
      res.send(books)
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo().then(() => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(console.dir);
