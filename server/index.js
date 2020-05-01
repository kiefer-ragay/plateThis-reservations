const express = require('express');
const app = express();
const db = require('../database/index.js');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
});

//app.get('/reservations')