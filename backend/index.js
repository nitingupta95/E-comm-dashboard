const express = require('express');
const cors = require('cors');
require('./db/config.js');
const User = require('./db/User.js');
const Product =require("./db/product.js");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());


app.post('/signup', async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password; // Removing password from the response
        resp.send(result);
    } catch (error) {
        console.error("Error during signup:", error);
        resp.status(500).send({ message: 'Internal Server Error' });
    }
});

app.post('/login', async (req, resp) => {
    try {
        console.log(req.body);
        
        // Input validation
        const { email, password } = req.body;
        if (!email || !password) {
            return resp.status(400).send({ message: "Email and password are required" });
        }

        let user = await User.findOne({ email, password }).select('-password');
        
        if (!user) {
            return resp.status(400).send({ message: "Invalid username or password" });
        } else {
            return resp.send(user);
        }
    } catch (error) {
        console.error("Error during login:", error);
        resp.status(500).send({ message: 'Internal Server Error' });
    }
});

app.post("/addproduct",async (req,resp)=>{
    let product= new Product(req.body);
    let result=await product.save();
    resp.send(result);
})


app.get("/products",async (req,resp)=>{
    let products=await Product.find();
    if(products.length>0){
        resp.send(products);
    }
    else{
        resp.send({message:"No products found"});
    }
})


app.delete('/product/:id',async (req,resp)=>{
    
    const result=await  Product.deleteOne({_id:req.params.id});
    
    resp.send(result);
});

app.get("/product/:id",async (req,resp)=>{
    let result= await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }
    else{
        resp.send({message:"Product not found"});
    }
})

app.put('/product/:id', async (req, resp) => {
    
      let result = await Product.updateOne(
        { _id: req.params.id },
        { $set:req.body }
      );
  
      resp.send(result);
     
  });
  app.get('/search/:key',async(req,resp)=>{
    let result= await Product.find({
        "$or":[
            {name:{$regex:req.params.key} },
            {price:{$regex:req.params.key} },
            {category:{$regex:req.params.key} },
            {company:{$regex:req.params.key} }
        ]
    })
    resp.send(result);
  })

  

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
