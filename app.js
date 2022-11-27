const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const Photo = require('./models/Photo');
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
// app.use(logger);

//? ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find().sort('-dateCreated');
  res.render('index', { photos });
});
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image; //yüklenecek olan dosyayı yakaladık.
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name; // yüklenecek dosya yolunu belirttik

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', { photo });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
});
app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deleteImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deleteImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`${port} aktif`);
});
