const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kyk1ijo.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run6() {
    try {

        const allTaskCollection = client.db('task').collection('allTask');



        app.get('/service6/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection6.findOne(query);
            res.send(service)
        })

        // Added Service Page's  backend

        app.post('/addedTask', async (req, res) => {
            const service = req.body;
            const result = await allTaskCollection.insertOne(service);
            res.send(result)

        })


        // Review Post '/service6/:id'

        app.post('/reviews', async (req, res) => {
            const reviews = req.body;
            const review = await reviewCollection.insertOne(reviews);
            console.log(review);
            res.send(review)
        })


        // (xomovid679@fgvod.com,nosel60130@klblogs.com,wenekex651@jernang.com)


        // Review Get by email

        app.get('/reviews', async (req, res) => {
            let query = {}
            if (req?.query?.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })


        // Show Specific Review on base id

        app.get('/review', async (req, res) => {
            let query = {}
            if (req?.query?.id) {
                query = {
                    id: req.query.id
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });


        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await allTaskCollection.deleteOne(query);
            res.send(result);

        })

    }
    finally {

    }
}
run6().catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello World!'))
app.all('*', (req, res) => res.send('404'));

app.listen(port, () => {
    console.log(`All ok ${port} `);
})