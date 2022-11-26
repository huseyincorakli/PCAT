const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 8888;

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
// app.use(logger);

//? ROUTES
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.listen(port, () => {
  console.log(`${port} aktif`);
});
