const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cmhqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    const database = client.db('EngineMechanic');
    const carRepairCollection = database.collection('CarRepairingDT');
    const serviceCollection= database.collection('services')

    // Gat Api 

    app.get('/CarRepairingDT',async(req,res)=>{
      const cursor = carRepairCollection.find({})
      const carRepair = await cursor.toArray();
      res.send(carRepair)
    })

    app.get('/services',async(req,res)=>{
      const cursor = serviceCollection.find({})
      const service = await cursor.toArray();
      res.send(service)
    })
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const service = await serviceCollection.findOne(query);
      res.json(service)
  })

   
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello Istiaque')
})

app.listen(port, () => {
    console.log(' travle server Raning ', port)
})


