const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
let app = express();

const { Schema }  = mongoose;
const taskScheme = new Schema({
  text: String,
  isCheck: Boolean
})

const Task = mongoose.model('tasks', taskScheme);
app.use(cors());
const uri = "mongodb://127.0.0.1:27017";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.json());

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {
    res.send({data: result});
  });
});

app.post('/createTask', (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send({data:result});
  });
});

app.delete('/deleteTask', (req, res) => {
  const { _id } = req.query;
  console.log('req.query', req.query);
  Task.deleteOne({ _id })
    .then(result => {
      console.log('res',result);
      res.send({ message: 'OK' });
    })
    .catch((err) => {
      res.status(400).send(`Bad Requset`)
    });
});

app.patch('/updateTask', (req, res) => {
  console.log('req.body', req.body);
  const { _id } = req.body;
  Task.findOneAndUpdate({ _id }, req.body).then(result => {
    console.log('result', result);
    res.send(result);
  })
  .catch((err) => {
    res.status(400).send('Bad Request')
  });
})
app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});