const express = require('express');
const app = express();
const db = require('../database/index.js');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
});

app.get('/', (req, res) => {
  res.send(__dirname + '/client/dist/index.html')
});

app.get('/reservations/:id', (req, res) => {
  console.log('responding to get request for reservations')
  db.getSchedule(req.params.id, (err, schedule) => {
    if(err) {
      res.status(404);
      res.end();
      console.log(err)
    } else {
      console.log(schedule);
      res.status(200);
      res.send(schedule);
      res.end();

    }
  })

})