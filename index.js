const mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://rajveer810214:XJvZX0soh0Tz86Fq@cluster0.3nxuodm.mongodb.net/test')
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.log(error));
const newSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  
  },
  des:{
    type:String,
    required:false
  }
})
const collection =mongoose.model("collection",newSchema)
module.exports=collection
module.exports=collection