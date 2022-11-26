const express = require('express');
const mongoose= require('mongoose')
const path = require('path');
const ejs = require('ejs');
const Photo=require('./models/Photo');
const port = 8888;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test2-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



/**const logger= (req,res,next)=>{
    console.log("log 1");
    // next();
}
* ! eğer next demez ise sonraki middleware çalışmayacaktır
*/

//? TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//? MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(logger);

//? ROUTES
app.get('/', async(req, res) => {
  const photos= await Photo.find();
  res.render('index',{photos});
});
app.get('/photos/:id', async(req, res) => {
  const photo= await Photo.findById(req.params.id);
  res.render('photo',{photo});
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos',async(req,res)=>{
  await Photo.create(req.body)
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`${port} aktif`);
});
