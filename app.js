const express = require('express');
const app = express();
const path = require('path')
const port = 8888;

//MIDDLEWARES
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,"temp/index.html"))
});

app.listen(port, () => {
  console.log(`${port} aktif`);
});
