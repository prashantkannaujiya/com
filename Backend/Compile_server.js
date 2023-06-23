var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var cors=require('cors');
var MongoClient=require('mongodb').MongoClient;
var bcrypt=require('bcrypt');
var url="mongodb://127.0.0.1:27017/";  

app.set('views','./views');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
var saltRounds=10;
var db;
MongoClient.connect(url,async (err,con)=>{
    if(err){console.log(err)}
    else{
   db=con.db('Compile');
    }
})
app.post('/Register',async(req,res)=>{
    var pwd;
    pwd=await bcrypt.hash(req.body.password,saltRounds);
    db.collection('com').insertOne({
        username:req.body.username,
        password:pwd,
        email:req.body.email
}).then((data)=>{console.log(data);res.send('inserted')}).catch((err)=>{console.log(err);})
})
app.post('/Login',async(req,res)=>{
    var data=await db.collection('com').find({username:req.body.username}).toArray();
    if(data.length!=0)
    {
var ress=await bcrypt.compare(req.body.password,data[0].password);
if(ress)
{
    res.send({message:'success',username:data[0].username})
}
else
{
    res.send({message:'wrong credentials'})
}
    }
})
app.post('/submitNotes',(req,res)=>{
    db.collection('com').findOneAndUpdate({username:req.body.username},{$push:{notes:req.body.note}})
    .then((data)=>{console.log(data);res.send(data);})
    .catch(err=>console.log(err))
})
app.get('/notes/:user',(req,res)=>{
    var user=req.params.user;
    db.collection('com').find({username:user}).toArray()
    .then((data)=>{console.log(data);
        if(data[0].hasOwnProperty('notes'))
        {
            res.send(data[0].notes)
        }
    else{
        res.send({message:'none'})
    } })
    .catch(err=>console.log(err))
})

app.listen(2100,()=>{console.log('started')})