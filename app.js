
const  express=require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator')
const cors= require ('cors');
const collection =require('./index');
const PORT = process.env.PORT || 3000;
const app=express();
const path=require("path")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
//nice
app.use(express.static(path.join(__dirname+"/public")))
//   });
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
app.post('/contact', [
    body('name').notEmpty(),
  body('email').isEmail(),
  body('des').notEmpty(),
    // password must be at least 5 chars long

], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, des } = req.body;
    
        
    
    const data = { name, email, des };
 
    try {
        await collection.insertMany([data]);
        console.log(data);
        res.status(200).json({ message: 'Your data has been saved successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving your data.' });
      }
    });

app.listen(PORT,()=>{
    // console.log(port);
    console.log("app is listening "+PORT);
})