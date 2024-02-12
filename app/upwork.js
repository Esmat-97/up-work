const { MongoClient } = require('mongodb');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));


const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });


                                /* get method*/

app.get('/',(req,res)=>{

    async function getdata(){
     try {

  const db =  client.db('mydb');

  const collection =  db.collection('student');

 
  var allProductsArray =  await collection.find().toArray();
   
  res.send(allProductsArray);


    }catch(err){
        console.error(err)
    }
}
getdata();
});




                                    /* post method*/



app.post('/',(req,res)=>{

 
async function postData (){


    try {

  const db =  client.db('mydb');

  const collection =  db.collection('student');


    const result= await  collection.insertOne({ name:req.body.name , email:req.body.email}, (insertErr, result) => {
    if (insertErr) {
      console.error('Error occurred while inserting document:', insertErr);
      return;
    }
    console.log(`Inserted document ID: ${result.insertedId}`);
  });

    }catch(err){
        console.error(err)
    }
 


}

postData();

});




app.listen(8000,()=>{
console.log('http://localhost:8000');
});