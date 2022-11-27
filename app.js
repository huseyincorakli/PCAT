const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const PhotoControllers = require('./controllers/photoControllers');
const PageControllers = require('./controllers/pageControllers');
const port = process.env.PORT || 8888;
require("dotenv").config();



const app = express();
mongoose.connect(`mongodb+srv://${process.env.USERNAME_ID}:${process.env.PAROLA}@pcatapp.h8qnibt.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("db connected");
}).catch((err)=>{
  console.log(err);
})

/**const logger= (req,res,next)=>{
    console.log("log 1");
    // next();
}
* ?eğer next demez ise sonraki middleware çalışmayacaktır
*/

//! TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//! MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
// app.use(logger);

//! ROUTES
//?Photo Controllers
app.get('/', PhotoControllers.getAllPhotos);
app.get('/photos/:id', PhotoControllers.getPhoto);
app.post('/photos', PhotoControllers.createPhoto);
app.put('/photos/:id', PhotoControllers.updatePhoto);
app.delete('/photos/:id', PhotoControllers.deletePhoto);
//?Page Controllers
app.get('/about', PageControllers.getAbout);
app.get('/add', PageControllers.getAdd);
app.get('/photos/edit/:id', PageControllers.getEditPhoto);

app.listen(port, () => {
  console.log(`${port} aktif`);
});
