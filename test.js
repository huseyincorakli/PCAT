const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//! Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test2-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//! Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});
const Photo = mongoose.model('Photo', PhotoSchema);
//!Create a data
/*Photo.create({
    title:"Photo title 3",
    description:"lorem ipsum 3"
})*/

//!Read a data
/*Photo.find({},(err,data)=>{
    console.log(data);
})*/

//!Update a data
/*
const id = '6382283d52c63c617fba48f4';
Photo.findByIdAndUpdate(
  id,
  {
    title: 'Photo 1.11',
    description: 'lorem ipsum 1.11',
  },
  {
    new: true,
  },
  (err, data) => {
    console.log(data);
  }
);
*/
//! Delete a data
const id = '6382283d52c63c617fba48f4';
Photo.findByIdAndDelete(
    id,
    (err,data)=>{
        console.log(`${data} is removed`);
    }
)
