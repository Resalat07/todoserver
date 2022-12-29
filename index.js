const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const app = express()


app.use(cors());
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.juc7iml.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const addTaskCollection = client.db('toDoApp').collection('addTask');

        app.post('/addTask', async (req, res) => {
            const addTask = req.body;
            console.log(addTask);
            const result = await addTaskCollection.insertOne(addTask);
            res.send(result)

        });



        // app.get('/addedTask', async (req, res) => {
        //     // const category_name = req.params.category_name;
        //     const query = {};
        //     const result = await addTaskCollection.find(query).toArray()
        //     res.send(result);
        // });

        app.get('/addedTask' ,async(req ,res)=>{
            const email= req.query.email;
            const query  = {email: email};
            const result = await addTaskCollection.find(query).toArray()
            res.send(result);
        });



        app.put('/addTask/complete/:id', async(req ,res)=>{
           
            const id =req.params.id;
            
            const filter = {_id:ObjectId(id)};
            const options = {upsert:true}
            const updatedUser = {
                $set:{
                    status: 'Complete'
                }
            }
            const result =await addTaskCollection.updateOne(filter , updatedUser, options);
            res.send(result)
        });


        app.put('/addTask/uncomplete/:id', async(req ,res)=>{
           
            const id =req.params.id;
            
            const filter = {_id:ObjectId(id)};
            const options = {upsert:true}
            const updatedUser = {
                $set:{
                    status: 'Not Complete'
                }
            }
            const result =await addTaskCollection.updateOne(filter , updatedUser, options);
            res.send(result)
        });




        app.put('/addTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };

            const user = req.body;
            console.log(user);
            const option = { upsert: true };
            const updatedUser = {
                $set: {
                    picture:user.picture,
                    comment:user.comment,
                    userUpdate:user.userUpdate

                }
            }
            const result = await addTaskCollection.updateOne(filter, updatedUser, option);
            res.send(result);
        })



        app.put('/addTask/comment/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };

            const user = req.body;
            console.log(user);
            const option = { upsert: true };
            const updatedUser = {
                $set: {
                    
                    comment:user.comment
                    

                }
            }
            const result = await addTaskCollection.updateOne(filter, updatedUser, option);
            res.send(result);
        })




        app.delete('/addTask/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await addTaskCollection.deleteOne(query)
            res.send(result)
        })


        
    }
    finally {

    }

}
run().catch(console.log)





app.get('/', async (req, res) => {
    res.send('todo running')
})
app.listen(port, () => console.log(port))