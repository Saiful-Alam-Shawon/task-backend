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



        // app.get('/service6/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const service = await serviceCollection6.findOne(query);
        //     res.send(service)
        // })

        // Added Service Page's  backend

        app.post('/addedTask', async (req, res) => {
            const service = req.body;
            // console.log(service);
            const result = await allTaskCollection.insertOne(service);
            // console.log(result);
            res.send(result)

        })





        // Task Get by email

        app.get('/getTaskByMail', async (req, res) => {
            let query = {}
            if (req?.query?.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = allTaskCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })


        // Show Specific Task on base id

        app.get('/task', async (req, res) => {
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

        // Task Put test

        app.put('/edit/:id', async (req, res) => {
            // console.log(req);
            const id = req.params.id;
            // console.log(id);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: req.body
            };
            // console.log(updatedDoc);
            const result = await allTaskCollection.updateOne(filter, updatedDoc, options);
            // res.send(result);
        })


        // Task Deleted

        app.delete('/task/:id', async (req, res) => {
            // console.log(req)
            const id = req.params.id;
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